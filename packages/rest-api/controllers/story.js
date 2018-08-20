const { Story } = require('../models')
const { to, errorHandler, successHandler } = require('../services/utils')

async function create(req, res) {
  res.setHeader('Content-Type', 'application/json')
  const [err, story] = await to(Story.create(req.body))
  if (err) return errorHandler(res, err, 422)

  return successHandler(res, { story: story.toWeb() }, 201)
}
module.exports.create = create

async function getAll(req, res) {
  res.setHeader('Content-Type', 'application/json')
  const [err, stories] = await to(req.user.Stories())
  if (err) return errorHandler(res, err, 422)
  let storiesJSON = []
  for (let i in stories) {
    const story = stories[i]
    storiesJSON.push(story.toWeb())
  }
  return successHandler(res, { companies: storiesJSON })
}
module.exports.getAll = getAll

function get(req, res) {
  res.setHeader('Content-Type', 'application/json')
  return successHandler(res, { company: req.story.toWeb() })
}
module.exports.get = get

async function update(req, res) {
  req.user.story.set(req.body)
  const [err, story] = await to(req.user.story.save())
  if (err) {
    return errorHandler(res, err)
  }
  return successHandler(res, { story: story.toWeb() })
}
module.exports.update = update

async function remove(req, res) {
  const [err] = await to(req.story.remove())
  if (err) return errorHandler(res, 'Error occured trying to delete the story')
  return successHandler(res, { message: 'Deleted story' }, 204)
}
module.exports.remove = remove
