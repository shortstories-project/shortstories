const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Email is required',
  },
  avatar: {
    type: String,
    trim: true,
    lowercase: true,
  },
  password: String,
  created: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
