const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')

const [major, minor] = process.versions.node.split('.').map(parseFloat)
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log(
    "🛑 🌮 🐶 💪 💩\nHey You! \n\t ya you! \n\t\tBuster! \n\tYou're on an older version of node that doesn't support the latest and greatest things we are learning (Async + Await)! Please go to nodejs.org and download version 7.6 or greater. 👌\n ",
  )
  process.exit()
}

dotenv.config({ path: 'variables.env' })

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })
mongoose.Promise = global.Promise
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`)
})

app.set('port', process.env.PORT || 7777)

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`)
})
