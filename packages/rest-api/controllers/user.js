const authService = require('../services/auth')
const { to, errorHandler, successHandler } = require('../services/utils')

/* READ */
async function get(req, res) {
  res.setHeader('Content-Type', 'application/json')
  return successHandler(res, { user: req.user })
}
module.exports.get = get

/* UPDATE */
async function update(req, res) {
  req.user.set(req.body)
  let [err, user] = await to(req.user.save())
  if (err) {
    if (err.message.includes('E11000')) {
      if (err.message.includes('email')) {
        err = 'This email address is already in use'
      } else {
        err = 'Duplicate Key Entry'
      }
    }
    return errorHandler(res, err)
  }
  return successHandler(res, { message: `Updated User: ${user.email}` })
}
module.exports.update = update

/* DELETE */
async function remove(req, res) {
  const [err] = await to(req.user.destroy())
  if (err) {
    return errorHandler(res, 'Error occured trying to delete user')
  }
  return successHandler(res, { message: 'Deleted User' }, 204)
}
module.exports.remove = remove

/* AUTH */
async function register(req, res) {
  res.setHeader('Content-Type', 'application/json')
  if (!req.body['unique_key'] && !req.body['email']) {
    return errorHandler(res, 'Please enter an email to register.')
  } else if (!req.body['password']) {
    return errorHandler(res, 'Please enter a password to register.')
  } else {
    const [err, user] = await to(authService.createUser(req.body))
    if (err) return errorHandler(res, err, 422)
    return successHandler(res, { message: 'Successfully created new user.', user, token: user.getJWT() }, 201)
  }
}
module.exports.register = register

async function login(req, res) {
  const [err, user] = await to(authService.authUser(req.body))
  if (err) {
    return errorHandler(res, err, 422)
  }
  return successHandler(res, { token: user.getJWT(), user })
}
module.exports.login = login
