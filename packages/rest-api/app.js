const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const { promisify } = require('es6-promisify')
const flash = require('connect-flash')
const expressValidator = require('express-validator')
const dotenv = require('dotenv')

const errorHandlers = require('./src/utils/error-handlers')
const routes = require('./src/routes')

dotenv.config({ path: 'variables.env' })

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(expressValidator())

app.use(cookieParser())

app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
)

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req, res, next) => {
  req.login = promisify(req.login, req)
  next()
})

app.use('/', routes)

app.use(errorHandlers.notFound)
app.use(errorHandlers.flashValidationErrors)

if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors)
}

app.use(errorHandlers.productionErrors)

module.exports = app
