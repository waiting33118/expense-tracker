const express = require('express')
const router = express.Router()
const homePage = require('./modules/homePage')
const expensePage = require('./modules/expense')
const userPage = require('./modules/users')
const { authenticator } = require('../middleware/auth')

// 各路由
router.use('/expense', authenticator, expensePage)
router.use('/users', userPage)
router.use('/', authenticator, homePage)

module.exports = router
