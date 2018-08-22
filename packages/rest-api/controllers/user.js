const User = require('../models/user')
const makeResponse = require('../utils/make-response')

async function getYourself(req, res) {
  try {
    const user = await User.findById(req.userId, { password: 0 })
    if (!user) return makeResponse(res, 404, 'User not found')
    makeResponse(res, 200, 'Success', user)
  } catch (error) {
    makeResponse(res, 500, 'There was a problem finding your profile')
  }
}

async function updateYourself(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.userId, req.body, { new: true })
    makeResponse(res, 200, 'Success', user)
  } catch (error) {
    makeResponse(res, 500, 'There was a problem updating profile')
  }
}

async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return makeResponse(res, 404, 'User not found')
    makeResponse(res, 200, 'Success', user)
  } catch (error) {
    makeResponse(res, 500, 'There was a problem finding the user')
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find({})
    makeResponse(res, 200, 'Success', users)
  } catch (error) {
    makeResponse(res, 500, 'There was a problem finding the users')
  }
}

module.exports = {
  getYourself,
  updateYourself,
  getUser,
  getAllUsers,
}
