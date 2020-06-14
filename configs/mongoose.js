const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const db = mongoose.connection
db.on('error', () => console.error('Connection Error!'))
db.once('open', () => console.log('Database Connected!'))

module.exports = db
