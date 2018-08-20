const Story = require('../models/story')
const { to, errorHandler } = require('../services/utils')

async function storyMiddleware(req, res, next) {
  const storyId = req.params.id
  const [err, story] = await to(Story.findOne({ _id: storyId }))
  if (err) return errorHandler(res, 'Error finding story')
  if (!story) return errorHandler(res, `Story not found with id: ${storyId}`)
  req.story = story
  next()
}

module.exports.storyMiddleware = storyMiddleware
