const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const category = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']

//渲染頁面-新增記帳
router.get('/new', (req, res) => {
	res.render('createNewExpense', { category })
})

//處理表單-新增記帳
router.post('/new', (req, res) => {
	const { name, date, category, amount } = req.body
	Record.create({
		name,
		date,
		category,
		amount,
	})
		.then(() => res.redirect('/'))
		.catch((err) => console.log(err))
})

//渲染頁面-修改記帳
router.get('/:_id/edit', (req, res) => {
	const id = req.params._id
	Record.findById(id)
		.lean()
		.then((record) => res.render('editExpense', { record, category }))
})

module.exports = router
