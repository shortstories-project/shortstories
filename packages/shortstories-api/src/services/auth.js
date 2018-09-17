import passport from 'passport'
import redis from 'redis'
import nanoid from 'nanoid'
import { Strategy as LocalStrategy } from 'passport-local'
import { AuthenticationError, UserInputError } from 'apollo-server'
import nodemailer from 'nodemailer'
import models from '../models'

const redisClient = redis.createClient()

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
            const token = nanoid(16)
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                type: 'OAuth2',
                user: process.env.SMTP_USER,
                clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
                clientSecret: process.env.GOOGLE_AUTH_SECRET,
                refreshToken: process.env.GOOGLE_AUTH_REFRESH_TOKEN,
              },
            })
            const mailOptions = {
              from: `Shortstories <${process.env.SMTP_USER}>`,
              to: user.email,
              subject: 'Nodemailer test',
              html: `
                <h3>Shortstories</h3>
                <p>Welcome to Shortstories</p>
                <p>Verify we have the right email address by clicking on the button below:</p>
                <a href="${
                  process.env.HOST
                }/verify?token=${token}">Verify my account!</a>
              `,
            }
            transporter.sendMail(mailOptions, err => {
              if (err) reject(new Error(err))
              redisClient.set(token, user.email)
              redisClient.expire(token, 3600)
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

function verifyUser(req, res, next) {
  redisClient.get(req.query.token, async (err, email) => {
    await models.User.query()
      .where({ email })
      .update({ is_verified: true })
    next()
  })
}

export default { signIn, signUp, verifyUser }
