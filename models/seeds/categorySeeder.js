const db = require('../../configs/mongoose')
const Category = require('../Category')
const categoryData = require('./category.json')

db.once('open', () => {
	categoryData.results.forEach((item) => {
		Category.create({
			category: item.category,
			icon: item.icon,
		})
	})
	console.log('The Category Data has been created!')
})
