const express = require('express')
const { login, logout, register, checkAuth } = require('../controllers/auth')
const verifyToken = require('../middleware/verify-token')

const router = express.Router()

router.post('/login', login)
router.get('/logout', logout)
router.post('/register', register)
router.get('/check-auth', verifyToken, checkAuth)

module.exports = router
