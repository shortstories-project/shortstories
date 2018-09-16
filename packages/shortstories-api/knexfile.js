require('dotenv').config()

module.exports = {
  test: {
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  },
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
}
