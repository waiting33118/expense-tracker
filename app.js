const express = require('express')
const exphdbs = require('express-handlebars')
const app = express()
require('./configs/mongoose')
const Record = require('./models/Record')
const Category = require('./models/Record')
const routes = require('./routes')
const PORT = process.env.PORT || 3000

app.engine('handlebars', exphdbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(routes)
app.use(express.static('public'))

app.listen(PORT, () =>
	console.log(`The Server is running on http://localhost:${PORT}`)
)
