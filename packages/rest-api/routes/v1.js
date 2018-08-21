const express = require('express')
const authController = require('../controllers/auth')
const storyController = require('../controllers/story')
const { catchErrors } = require('../services/utils')
// const UserController = require('../controllers/user')
// const passportMiddleware = require('../middleware/passport')
// const { storyMiddleware } = require('../middleware/story')

const router = express.Router()

// passportMiddleware(passport)

// router.get('/', (req, res) => {
//   res.json({ status: 'success', message: 'Parcel Pending API', data: { version_number: 'v1.0.0' } })
// })

// // Auth
// router.post('/users/register', UserController.register)
// router.post('/users/login', UserController.login)

// // Users
// router.get('/users', passport.authenticate('jwt', { session: false }), UserController.get)
// router.put('/users', passport.authenticate('jwt', { session: false }), UserController.update)
// router.delete('/users', passport.authenticate('jwt', { session: false }), UserController.remove)

// // Stories
// router.post('/stories', passport.authenticate('jwt', { session: false }), storyController.createStory)
// router.get('/stories', passport.authenticate('jwt', { session: false }), storyController.getStories)
// router.get('/stories/:id', passport.authenticate('jwt', { session: false }), storyMiddleware, storyController.get)
// router.put('/stories/:id', passport.authenticate('jwt', { session: false }), storyMiddleware, storyController.update)
// router.delete('/stories/:id', passport.authenticate('jwt', { session: false }), storyMiddleware, storyController.remove)

// Stories
router.post('/stories', authController.isLoggedIn, storyController.createStory)

// Authentification
router.post('/auth/register', authController.validateRegister, authController.register, authController.login)
router.post('/auth/login', authController.login)
router.get('/auth/logout', authController.logout)

module.exports = router
