const Story = require('../models/story')
const makeResponse = require('../utils/make-response')

async function getStories(req, res) {
  try {
    const stories = await Story.find({})
    makeResponse(res, 200, 'Success', stories)
  } catch (error) {
    makeResponse(res, 500, 'There was a problem finding the stories')
  }
}

async function getStory(req, res) {
  try {
    const story = await Story.findById(req.params.id)
    if (!story) return makeResponse(res, 404, 'Story not found')
    makeResponse(res, 200, 'Success', story)
  } catch (error) {
    makeResponse(res, 500, 'There was a problem finding the story')
  }
}

async function createStory(req, res) {
  try {
    const story = await Story.create(req.body)
    makeResponse(res, 200, 'Success', story)
  } catch (error) {
    makeResponse(res, 500, 'There was a problem create story')
  }
}

async function updateStory(req, res) {
  try {
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true })
    makeResponse(res, 200, 'Success', story)
  } catch (error) {
    makeResponse(res, 500, 'There was a problem update story')
  }
}

async function deleteStory(req, res) {
  try {
    await Story.deleteOne({ _id: req.params.id })
    makeResponse(res, 204, 'Success')
  } catch (error) {
    makeResponse(res, 500, 'There was a problem delete story')
  }
}

module.exports = {
  getStories,
  getStory,
  createStory,
  updateStory,
  deleteStory,
}
