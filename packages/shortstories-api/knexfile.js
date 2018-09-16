require('dotenv').config()

module.exports = {
  test: {
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
    seeds: {
      directory: `${__dirname}/seeds/test`,
    },
  },
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: `${__dirname}/seeds/development`,
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: `${__dirname}/seeds/production`,
    },
  },
}
