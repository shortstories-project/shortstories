const jwt = require('jsonwebtoken')
const makeResponse = require('../utils/make-response')
const config = require('../config')

async function verifyToken(req, res, next) {
  try {
    const { token } = req.session
    if (!token) return makeResponse(res, 403, 'No token provided', { auth: false })
    const decoded = await jwt.verify(token, config.SECRET)
    req.userId = decoded.id
    next()
  } catch (error) {
    makeResponse(res, 500, 'Failed to authenticate token', { auth: false })
  }
}

module.exports = verifyToken
