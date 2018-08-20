const express = require('express')
const router = express.Router()
const storyController = require('../controllers/story')

router.get('/', storyController.homePage)

module.exports = router
