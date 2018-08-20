const express = require('express')
const UserController = require('../controllers/user')
const StoryController = require('../controllers/story')
const passport = require('passport')
const passportMiddleware = require('../middleware/passport')
const { storyMiddleware } = require('../middleware/story')

const router = express.Router()

passportMiddleware(passport)

router.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Parcel Pending API', data: { version_number: 'v1.0.0' } })
})

// Users
router.post('/users', UserController.create)
router.get('/users', passport.authenticate('jwt', { session: false }), UserController.get)
router.put('/users', passport.authenticate('jwt', { session: false }), UserController.update)
router.delete('/users', passport.authenticate('jwt', { session: false }), UserController.remove)
router.post('/users/login', UserController.login)

// Stories
router.post('/stories', passport.authenticate('jwt', { session: false }), StoryController.create)
router.get('/stories', passport.authenticate('jwt', { session: false }), StoryController.getAll)
router.get('/stories/:id', passport.authenticate('jwt', { session: false }), storyMiddleware, StoryController.get)
router.put('/stories/:id', passport.authenticate('jwt', { session: false }), storyMiddleware, StoryController.update)
router.delete('/stories/:id', passport.authenticate('jwt', { session: false }), storyMiddleware, StoryController.remove)

module.exports = router
