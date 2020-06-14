const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const categoryItems = [
  '全部...',
  '家居物業',
  '交通出行',
  '休閒娛樂',
  '餐飲食品',
  '其他'
]
const monthItems = [
  '全部...',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12'
]

// 渲染首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .sort('_id')
    .lean()
    .then((record) => {
      let totalAmount = 0
      record.forEach((item) => {
        totalAmount += item.amount
        item.category = convertToIcon(item.category)
      })
      res.render('home', { record, categoryItems, monthItems, totalAmount })
    })
    .catch((err) => console.log(err))
})

// 篩選器
router.get('/filter', (req, res) => {
  const userId = req.user._id
  const { category, month } = req.query

  if (category === '全部...' && month === '全部...') {
    return res.redirect('/')
  }

  if (category === '全部...') {
    return Record.find({
      userId,
      date: { $regex: `-${month}-`, $options: 'i' }
    })
      .sort('_id')
      .lean()
      .then((record) => {
        let totalAmount = 0
        record.forEach((item) => {
          totalAmount += item.amount
          item.category = convertToIcon(item.category)
        })
        const sortedMonth = monthItems.filter((months) => months !== month)
        sortedMonth.unshift(month)
        res.render('home', {
          record,
          categoryItems,
          monthItems: sortedMonth,
          totalAmount
        })
      })
      .catch((err) => console.log(err))
  }

  if (month === '全部...') {
    return Record.find({ userId, category })
      .sort('_id')
      .lean()
      .then((record) => {
        let totalAmount = 0
        record.forEach((item) => {
          totalAmount += item.amount
          item.category = convertToIcon(item.category)
        })
        const sortedCategory = categoryItems.filter(
          (categories) => categories !== category
        )
        sortedCategory.unshift(category)
        res.render('home', {
          record,
          categoryItems: sortedCategory,
          monthItems,
          totalAmount
        })
      })
      .catch((err) => console.log(err))
  }

  Record.find({
    userId,
    $and: [{ category }, { date: { $regex: `-${month}-`, $options: 'i' } }]
  })
    .sort('_id')
    .lean()
    .then((record) => {
      console.log(record)
      let totalAmount = 0
      record.forEach((item) => {
        totalAmount += item.amount
        item.category = convertToIcon(item.category)
      })
      const sortedCategory = categoryItems.filter(
        (categories) => categories !== category
      )
      sortedCategory.unshift(category)
      const sortedMonth = monthItems.filter((months) => months !== month)
      sortedMonth.unshift(month)
      res.render('home', {
        record,
        categoryItems: sortedCategory,
        monthItems: sortedMonth,
        totalAmount
      })
    })
    .catch((err) => console.log(err))
})

function convertToIcon(category) {
  switch (category) {
    case '家居物業':
      return '<i class="fas fa-home"></i>'
    case '交通出行':
      return '<i class="fas fa-shuttle-van"></i>'
    case '休閒娛樂':
      return '<i class="fas fa-grin-beam"></i>'
    case '餐飲食品':
      return '<i class="fas fa-utensils"></i>'
    case '其他':
      return '<i class="fas fa-pen"></i>'
  }
}

module.exports = router
