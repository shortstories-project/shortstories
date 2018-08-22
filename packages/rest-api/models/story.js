const mongoose = require('mongoose')

const storySchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Title is required',
  },
  body: {
    type: String,
    trim: true,
    required: 'Story text is required',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  created: {
    type: Date,
    default: Date.now,
  },
})

const Story = mongoose.model('Story', storySchema)

module.exports = Story
