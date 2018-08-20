const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validate = require('mongoose-validator')
const Story = require('./story')
const { throwError, to } = require('../services/utils')
const config = require('../config')

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
      sparse: true,
      validate: [
        validate({
          validator: 'isEmail',
          message: 'Not a valid email',
        }),
      ],
      password: {
        type: String,
      },
    },
  },
  { timestamps: true }
)

UserSchema.virtual('stories', {
  ref: 'Story',
  localField: '_id',
  foreignField: 'users.user',
  justOne: false,
})

UserSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    const [saltErr, salt] = await to(bcrypt.genSalt(10))
    if (saltErr) throwError(saltErr.message, true)
    const [hashErr, hash] = await to(bcrypt.hash(this.password, salt))
    if (hashErr) throwError(hashErr.message, true)
    this.password = hash
  } else {
    return next()
  }
})

UserSchema.methods.comparePassword = async function(password) {
  if (!this.password) throwError('Password not set')
  const [err, pass] = await to(bcrypt.compare(password, this.password))
  if (err) throwError(err)
  if (!pass) throwError('invalid password')
  return this
}

UserSchema.methods.Stories = async function() {
  const [err, stories] = await to(Story.find({ 'users.user': this._id }))
  if (err) throwError('Error getting stories')
  return stories
}

UserSchema.methods.getJWT = function() {
  const expirationTime = parseInt(config.JWT_EXPIRATION)
  return `Bearer ${jwt.sign({ user_id: this._id }, config.JWT_ENCRYPTION, { expiresIn: expirationTime })}`
}

UserSchema.methods.toWeb = function() {
  const json = this.toJSON()
  json.id = this._id
  return json
}

const User = (module.exports = mongoose.model('User', UserSchema)) // eslint-disable-line
