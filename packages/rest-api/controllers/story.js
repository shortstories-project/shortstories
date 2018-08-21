const { Story, User } = require('../models')
const { to, errorHandler, successHandler } = require('../services/utils')

exports.createStory = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  req.body.author = await User.findOne({ _id: req.user._id })
  const story = await new Story(req.body).save()
  res.status(201).send({
    code: 201,
    data: story,
    message: 'Success',
  })
}

exports.getStories = async (req, res) => {
  const page = +req.query.page || 1
  const limit = 20
  const skip = page * limit - limit
  const storiesPromise = Story.find()
    .skip(skip)
    .limit(limit)
    .sort({ created: 'desc' })
  const countPromise = Story.count()
  const [stories, count] = await Promise.all([storiesPromise, countPromise])
  const pages = Math.ceil(count / limit)
  res.status(200).send({
    code: 200,
    data: {
      stories,
      meta: {
        page,
        total: pages,
        'has-next': page < pages,
      },
    },
    message: 'OK',
  })
}

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
