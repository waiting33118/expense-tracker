const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const category = [
	'全部...',
	'家居物業',
	'交通出行',
	'休閒娛樂',
	'餐飲食品',
	'其他',
]

//渲染首頁
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

//篩選器
router.get('/category', (req, res) => {
	const filterValue = req.query.filter

	Record.find({ category: `${filterValue}` })
		.sort('_id')
		.lean()
		.then((record) => {
			let totalAmount = 0
			record.forEach((item) => {
				totalAmount += item.amount
				item.category = convertToIcon(item.category)
			})
			let sortedCategory = category.filter((item) => item !== filterValue)
			sortedCategory.unshift(filterValue)
			if (filterValue === '全部...') {
				res.redirect('/')
			} else {
				res.render('home', { record, category: sortedCategory, totalAmount })
			}
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
