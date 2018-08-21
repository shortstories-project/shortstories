const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const parseError = require('parse-error')
const cors = require('cors')
const expressValidator = require('express-validator')
const v1 = require('./routes/v1')

require('./middleware/passport')

const app = express()

const config = require('./config')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(cookieParser())

app.use(
  session({
    secret: config.SECRET,
    key: config.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

app.use(passport.initialize())
app.use(passport.session())

const models = require('./models') // eslint-disable-line

app.use(cors())

app.use('/api/v1', v1)
app.use('/', (req, res) => {
  res.statusCode = 200
  res.json({ status: 'success', message: 'Parcel Pending API', data: {} })
})

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

process.on('unhandledRejection', error => {
  console.error('Uncaught Error', parseError(error))
})
