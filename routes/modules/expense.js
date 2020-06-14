const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const category = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']

// 渲染頁面-新增記帳
router.get('/new', (req, res) => {
  res.render('createNewExpense', { category })
})

// 處理表單-新增記帳
router.post('/new', (req, res) => {
  const userId = req.user._id
  const { merchant, name, date, category, amount } = req.body
  Record.create({
    merchant,
    name,
    date,
    category,
    amount,
    userId
  })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

// 渲染頁面-篩選類別
router.get('/:_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params._id
  Record.findOne({ userId, _id })
    .lean()
    .then((record) => {
      const sortedCategory = category.filter((item) => item !== record.category)
      sortedCategory.unshift(record.category)
      res.render('editExpense', { record, sortedCategory })
    })
    .catch((err) => console.log(err))
})

// 處理表單-修改記帳
router.put('/:_id', (req, res) => {
  const userId = req.user._id
  const { merchant, name, date, category, amount } = req.body
  const _id = req.params._id
  Record.findOne({ userId, _id })
    .then((record) => {
      record.merchant = merchant
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      record.save()
      res.redirect('/')
    })
    .catch((err) => console.log(err))
})

// 處理觸發-刪除記帳
router.delete('/:_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params._id
  Record.findOne({ userId, _id })
    .then((record) => record.remove())
    .catch((err) => console.log(err))
  res.redirect('/')
})

module.exports = router
