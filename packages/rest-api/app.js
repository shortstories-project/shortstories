const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const parseError = require('parse-error')
const cors = require('cors')
const v1 = require('./routes/v1')

const app = express()

const config = require('./config') // eslint-disable-line

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(passport.initialize())

const models = require('./models') // eslint-disable-line

app.use(cors())

app.use('/v1', v1)
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
