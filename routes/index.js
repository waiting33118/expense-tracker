const express = require('express')
const router = express.Router()
const homePage = require('./modules/homePage')

//首頁
router.use('/', homePage)

module.exports = router
