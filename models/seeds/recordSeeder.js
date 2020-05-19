const db = require('../../configs/mongoose')
const Record = require('../Record')
const recordData = require('./record.json')

db.once('open', () => {
	recordData.results.forEach((item) => {
		Record.create({
			name: item.name,
			category: item.category,
			date: item.date,
			amount: item.amount,
		})
	})
	console.log('The Record Data has been created!')
})
