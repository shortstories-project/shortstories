import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { AuthenticationError, UserInputError } from 'apollo-server'
import nodemailer from 'nodemailer'
import models from '../models'
import { SENDER_EMAIL } from '../constants'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await models.User.query().findById(id)
    done(null, user)
  } catch (e) {
    done(e)
  }
})

passport.use(
  new LocalStrategy(
    { usernameField: 'login' },
    async (login, password, done) => {
      try {
        const user = await models.User.findByLogin(login)
        if (!user) {
          throw new UserInputError('No user found with this login credentials.')
        }
        const isValid = await user.validatePassword(password)
        if (!isValid) {
          throw new AuthenticationError('Invalid password.')
        }
        return done(null, user)
      } catch (e) {
        return done(e)
      }
    }
  )
)

async function signUp({ email, username, password }, req) {
  await models.User.query().insert({ email, username, password })

  return models.User.query()
    .findOne({ email })
    .then(
      user =>
        new Promise((resolve, reject) => {
          req.login(user, async err => {
            if (err) reject(new Error(err))
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
              },
            })
            const mailOptions = {
              from: SENDER_EMAIL,
              to: user.email,
              subject: 'Subject of your email',
              html: '<p>Your html here</p>',
            }
            transporter.sendMail(mailOptions, err => {
              if (err) reject(new Error(err))
              resolve(user)
            })
          })
        })
    )
}

function signIn({ login, password }, req) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (err) reject(new Error(err))
      if (!user) reject(new Error('Invalid credentials.'))
      req.login(user, () => resolve(user))
    })({ body: { login, password } })
  })
}

export default { signIn, signUp }
