const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const makeResponse = require('../utils/make-response')
const setCookie = require('../utils/set-cookie')
const config = require('../config')

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return makeResponse(res, 404, 'User not found')
    }
    const passwordIsValid = await bcrypt.compare(req.body.password, user.password)
    if (!passwordIsValid) {
      return makeResponse(res, 401, 'Incorrect password', { auth: false, token: null })
    }
    const token = jwt.sign({ id: user._id }, config.SECRET, {
      expiresIn: 86400,
    })
    setCookie(res, token).send({
      code: 200,
      data: { auth: true },
      message: 'Logged in',
    })
  } catch (error) {
    makeResponse(res, 500, 'Failure login on the server')
  }
}

function logout(req, res) {
  res.clearCookie('token')
  makeResponse(res, 200, { auth: false })
}

async function register(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8)
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    })
    const token = jwt.sign({ id: user._id }, config.SECRET, {
      expiresIn: 86400,
    })
    setCookie(res, token).send({
      code: 200,
      data: { auth: true },
      message: 'User has successfully registered',
    })
  } catch (error) {
    makeResponse(res, 500, 'Failure register on the server')
  }
}

async function checkAuth(req, res) {
  try {
    const user = await User.findById(req.userId, { password: 0 })
    if (!user) {
      return makeResponse(res, 404, 'User not found')
    }
    makeResponse(res, 200, 'Logged in', { auth: true })
  } catch (error) {
    makeResponse(res, 500, 'Failure check auth on the server')
  }
}

module.exports = {
  login,
  logout,
  register,
  checkAuth,
}
