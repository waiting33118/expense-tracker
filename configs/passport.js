const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const LocalStrategy = require('passport-local').Strategy

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              return done(
                null,
                false,
                req.flash('alert_msg', '此帳號尚未註冊！')
              )
            }
            bcrypt
              .compare(password, user.password)
              .then((isMatch) => {
                if (isMatch) {
                  return done(null, user)
                }
                return done(null, false, req.flash('alert_msg', '密碼錯誤'))
              })
              .catch((err) => done(err, false))
          })
          .catch((err) => done(err, false))
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((_id, done) => {
    User.findById({ _id })
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, false))
  })
}
