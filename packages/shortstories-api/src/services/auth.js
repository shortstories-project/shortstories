import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { AuthenticationError, UserInputError } from 'apollo-server'
import models from '../models'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await models.User.findById(id)
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
  await models.User.create({
    avatar: '/img/assets/default.jpg',
    username,
    email,
    password,
  })

  return models.User.findOne({
    where: {
      email,
    },
  }).then(
    user =>
      new Promise((resolve, reject) => {
        req.login(user, err => {
          if (err) reject(err)
          resolve(user)
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
