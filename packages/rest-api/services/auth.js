const validator = require('validator')
const { User } = require('../models')
const { to, throwError } = require('../services/utils')

function getUniqueKeyFromBody(body) {
  let uniqueKey = body['unique_key']
  if (typeof body['unique_key'] === 'undefined') {
    if (typeof body['email'] !== 'undefined') {
      uniqueKey = body['email']
    } else {
      uniqueKey = null
    }
  }
  return uniqueKey
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody

async function createUser(userInfo) {
  let uniqueKey, authInfo
  authInfo = {}
  authInfo.status = 'create'
  uniqueKey = getUniqueKeyFromBody(userInfo)
  if (!uniqueKey) throwError('An email was not entered.')
  if (validator.isEmail(uniqueKey)) {
    uniqueKey.method = 'email'
    userInfo.email = uniqueKey
    const [err, user] = await to(User.create(userInfo))
    console.log(err)
    if (err) throwError('User already exists with that email')
    return user
  } else {
    throwError('A valid email was not entered.')
  }
}
module.exports.createUser = createUser

async function authUser(userInfo) {
  let uniqueKey
  let authInfo = {}
  authInfo.status = 'login'
  uniqueKey = getUniqueKeyFromBody(userInfo)
  if (!uniqueKey) throwError('Please enter an email to login')
  if (!userInfo.password) throwError('Please enter a password to login')
  let user
  if (validator.isEmail(uniqueKey)) {
    authInfo.method = 'email'
    const [err, findedUser] = await to(User.findOne({ email: uniqueKey }))
    user = findedUser
    if (err) throwError(err.message)
    if (!user) throwError('Not registered')
  } else {
    throwError('A valid email or phone number was not entered')
  }
  const [err, matchedUser] = await to(user.comparePassword(userInfo.password))
  user = matchedUser
  if (err) throwError(err.message)
  return user
}
module.exports.authUser = authUser
