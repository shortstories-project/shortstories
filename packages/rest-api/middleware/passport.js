const { ExtractJwt, Strategy } = require('passport-jwt')
const { User } = require('../models')
const { to } = require('../services/utils')
const config = require('../config')

module.exports = function(passport) {
  let opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = config.JWT_ENCRYPTION
  passport.use(
    new Strategy(opts, async (jwtPayload, done) => {
      const [err, user] = await to(User.findById(jwtPayload.user_id))
      if (err) return done(err, false)
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  )
}
