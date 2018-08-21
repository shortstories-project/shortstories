const mongoose = require('mongoose')

const { Schema } = mongoose
mongoose.Promise = global.Promise

const storySchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  body: {
    type: String,
    trim: true,
    required: true,
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  meta: {
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
})

function autopopulate(next) {
  this.populate('author')
  next()
}

storySchema.pre('find', autopopulate)
storySchema.pre('findOne', autopopulate)

module.exports = mongoose.model('Story', storySchema)
