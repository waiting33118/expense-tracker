if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const db = require('../../configs/mongoose')
const Record = require('../Record')
const User = require('../User')
const usersInfo = require('./record.json').users

db.once('open', () => {
  generateDummyData(usersInfo, 0)
  generateDummyData(usersInfo, 1)
  console.log('The data has been created!')
})

const generateDummyData = (userData, index) => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(userData[index].password, salt))
    .then((hash) => {
      return User.create({
        name: userData[index].name,
        email: userData[index].email,
        password: hash
      }).catch((err) => console.log(err))
    })
    .then((user) => {
      const userId = user._id
      Promise.all(
        Array.from(userData[index].records, (record) => {
          Record.create({
            name: record.name,
            merchant: record.merchant,
            category: record.category,
            date: record.date,
            amount: record.amount,
            userId
          })
        })
      ).catch((err) => console.log(err))
    })
}
