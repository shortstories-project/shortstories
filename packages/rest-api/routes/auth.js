const express = require('express')
const { login, logout, register, getProfile } = require('../controllers/auth')
const verifyToken = require('../middleware/verify-token')

const router = express.Router()

router.post('/login', login)
router.get('/logout', logout)
router.post('/register', register)
router.get('/me', verifyToken, getProfile)

module.exports = router
