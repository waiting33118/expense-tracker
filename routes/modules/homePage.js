const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const category = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']

router.get('/', (req, res) => {
	Record.find()
		.sort('_id')
		.lean()
		.then((record) => {
			let totalAmount = 0
			record.forEach((item) => {
				totalAmount += item.amount
			})
			res.render('home', { record, category, totalAmount })
		})
		.catch((err) => console.log(err))
})

module.exports = router
