const express = require('express')
const { getStories, getStory, createStory, updateStory, deleteStory } = require('../controllers/story')
const verifyToken = require('../middleware/verify-token')

const router = express.Router()

router.get('/', verifyToken, getStories)
router.get('/:id', verifyToken, getStory)
router.post('/', verifyToken, createStory)
router.put('/:id', verifyToken, updateStory)
router.delete('/:id', verifyToken, deleteStory)

module.exports = router
