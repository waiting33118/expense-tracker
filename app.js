const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const exphdbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
require('./configs/mongoose')
const usePassport = require('./configs/passport')
const routes = require('./routes')
const PORT = process.env.PORT

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
app.use(express.static('public'))
app.engine('handlebars', exphdbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.alert_msg = req.flash('alert_msg')
  res.locals.success_msg = req.flash('success_msg')
  return next()
})
app.use(routes)

app.listen(PORT, () => console.log(`The Server is running on PORT:${PORT}`))
