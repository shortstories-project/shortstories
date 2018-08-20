const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

StorySchema.methods.toWeb = function() {
  const json = this.toJSON()
  json.id = this._id
  return json
}

const Story = (module.exports = mongoose.model('Story', StorySchema)) // eslint-disable-line
