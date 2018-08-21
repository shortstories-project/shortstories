const passport = require('passport')
const { promisify } = require('es6-promisify')
const User = require('../models/user')

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name')
  req.checkBody('name', 'You must supply a name!').notEmpty()
  req.checkBody('email', 'That Email is not valid!').isEmail()
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  })
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty()
  req.checkBody('password-confirm', 'Confirmed Password cannot be blank!').notEmpty()
  req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password)

  const errors = req.validationErrors()
  if (errors) {
    res.status(422).send({
      code: 422,
      data: errors,
      message: 'Errors',
    })
    return
  }
  next()
}

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name })
  const register = promisify(User.register.bind(User))
  await register(user, req.body.password)
  next()
}

exports.login = passport.authenticate('local')

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/auth/login')
}

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
    return
  }
  res.redirect('/auth/login')
}
