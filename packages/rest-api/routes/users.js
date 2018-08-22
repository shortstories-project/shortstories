const express = require('express')
const { getYourself, updateYourself, getUser, getAllUsers } = require('../controllers/user')
const verifyToken = require('../middleware/verify-token')

const router = express.Router()

router.get('/', verifyToken, getAllUsers)
router.get('/me', verifyToken, getYourself)
router.put('/me', verifyToken, updateYourself)
router.get('/:id', verifyToken, getUser)

module.exports = router
