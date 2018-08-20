const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const models = {}
const mongoose = require('mongoose')
const config = require('../config')

if (config.DB_HOST !== '') {
  fs.readdirSync.filter(file => file !== basename).forEach(file => {
    const filename = file.split('.')[0]
    const modelName = filename.charAt(0).toUppercase() + filename.slice(1)
    models[modelName] = require('./' + file)
  })
  mongoose.Promise = global.Promise
  const mongoLocation = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${
    config.DB_NAME
  }`
  mongoose.connect(mongoLocation).catch(() => {
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
