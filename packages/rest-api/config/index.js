require('dotenv').config()

const config = {
  NODE_ENV: process.env.NODE_ENV,
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
  KEY: process.env.KEY,
}

module.exports = config
