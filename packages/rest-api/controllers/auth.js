const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const makeResponse = require('../utils/make-response')
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
      expiresIn: 2147483647,
    })
    req.session.token = token
    makeResponse(res, 200, 'Logged in', { auth: true })
  } catch (error) {
    makeResponse(res, 500, 'Failure login on the server')
  }
}

async function logout(req, res) {
  try {
    await req.session.destroy()
    makeResponse(res, 200, { auth: false })
  } catch (error) {
    makeResponse(res, 500, 'Failure logout on the server')
  }
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
      expiresIn: 2147483647,
    })
    req.session.token = token
    makeResponse(res, 201, 'User has successfully registered', { auth: true })
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
