const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post(
  '/login',
  (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
      req.flash('alert_msg', '請輸入帳號和密碼！')
      return res.redirect('/users/login')
    }
    return next()
  },
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errorMessages = []
  // 檢查必填項目
  if (!name || !email || !password) {
    errorMessages.push({
      message: '請填寫必填項目！'
    })
  }
  // 檢查密碼是否一致
  if (password !== confirmPassword) {
    errorMessages.push({
      message: '密碼與確認密碼不一致！'
    })
  }
  // 檢查帳號是否已被註冊
  User.findOne({ email }).then((user) => {
    if (user) {
      errorMessages.push({
        message: '此帳號已被註冊！'
      })
    }
    // 顯示錯誤訊息
    if (errorMessages.length) {
      return res.render('register', {
        name,
        email,
        errorMessages
      })
    }
    // 建立帳號
    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) => {
        User.create({
          name,
          email,
          password: hash
        })
      })
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '已成功登出！')
  res.redirect('/users/login')
})

module.exports = router
