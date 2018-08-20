const fs = require('fs')
const models = {}
const mongoose = require('mongoose')
const config = require('../config')

if (config.DB_HOST !== '') {
  fs.readdirSync('./models')
    .filter(file => file !== 'index.js')
    .forEach(file => {
      const filename = file.split('.')[0]
      const modelName = filename.charAt(0).toUpperCase() + filename.slice(1)
      models[modelName] = require('./' + file)
    })
  mongoose.Promise = global.Promise
  const mongoLocation = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${
    config.DB_NAME
  }`
  mongoose
    .connect(
      mongoLocation,
      { useNewUrlParser: true }
    )
    .catch(() => {
      console.log(`*** Can Not Connect to Mongo Server: ${mongoLocation} ***`)
    })
  const db = mongoose.connection
  module.exports = db
  db.once('open', () => {
    console.log(`*** Connected to mongo at ${mongoLocation} ***`)
  })
  db.on('error', error => {
    console.log(`*** Error: ${error} ***`)
  })
} else {
  console.log('*** No Mongo Credentials Given ***')
}

module.exports = models
