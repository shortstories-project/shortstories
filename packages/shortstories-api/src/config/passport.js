import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { AuthenticationError, UserInputError } from 'apollo-server'
import User from '../models/user'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.query().findById(id)
    done(null, user)
  } catch (e) {
    done(e, false, { message: 'Server error' })
  }
})

passport.use(
  new LocalStrategy(
    {
      usernameField: 'login',
      passwordField: 'password',
      passReqToCallback: false,
    },
    async (login, password, done) => {
      try {
        const user = await User.findByLogin(login)
        if (!user) {
          throw new UserInputError('No user found with this login credentials.')
        }
        const isValid = await user.validatePassword(password)
        if (!isValid) {
          throw new AuthenticationError('Invalid password.')
        }
        return done(null, user)
      } catch (e) {
        return done(e, false, { message: 'Server error' })
      }
    }
  )
)
