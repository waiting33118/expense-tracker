const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const category = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']

//新增記帳
router.get('/new', (req, res) => {
	res.render('createNewExpense', { category })
})

//接收新增記帳表單
router.post('/new', (req, res) => {
	console.log(req.body)
})

module.exports = router
