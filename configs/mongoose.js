const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Expense', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', () => console.error('Connection Error!'))
db.once('open', () => console.log('Database Connected!'))

module.exports = db
