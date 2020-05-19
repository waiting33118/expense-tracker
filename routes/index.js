const express = require('express')
const router = express.Router()
const homePage = require('./modules/homePage')
const expensePage = require('./modules/expense')
//首頁
router.use('/', homePage)
router.use('/expense', expensePage)

module.exports = router
