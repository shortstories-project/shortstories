const mongoose = require('mongoose')
const validator = require('validator')
const mongooseMongodbErrors = require('mongoose-mongodb-errors')
const passportLocalMongoose = require('passport-local-mongoose')

const { Schema } = mongoose
mongoose.Promise = global.Promise

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Invalid Email Address'],
      required: 'Please Supply an email address',
    },
    name: {
      type: String,
      required: 'Please supply a name',
      trim: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

userSchema.virtual('stories', {
  ref: 'Story',
  localField: '_id',
  foreignField: 'body',
})

function autopopulate(next) {
  this.populate('stories')
  next()
}

userSchema.pre('find', autopopulate)
userSchema.pre('findOne', autopopulate)

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
userSchema.plugin(mongooseMongodbErrors)

module.exports = mongoose.model('User', userSchema)
