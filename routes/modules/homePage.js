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
				item.category = convertToIcon(item.category)
			})
			res.render('home', { record, category, totalAmount })
		})
		.catch((err) => console.log(err))
})

function convertToIcon(category) {
	switch (category) {
		case '家居物業':
			return `<i class="fas fa-home"></i>`
		case '交通出行':
			return `<i class="fas fa-shuttle-van"></i>`
		case '休閒娛樂':
			return `<i class="fas fa-grin-beam"></i>`
		case '餐飲食品':
			return `<i class="fas fa-utensils"></i>`
		case '其他':
			return `<i class="fas fa-pen"></i>`
	}
}

module.exports = router
