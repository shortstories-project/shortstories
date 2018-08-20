require('dotenv').config()

let config = {}

config.APP = process.env.APP || 'dev'
config.PORT = process.env.PORT || '3000'

config.DB_DIALECT = process.env.DB_DIALECT || 'mongo'
config.DB_HOST = process.env.DB_HOST || 'localhost'
config.DB_PORT = process.env.DB_PORT || '3306'
config.DB_NAME = process.env.DB_NAME || 'name'
config.DB_USER = process.env.DB_USER || 'root'
config.DB_PASSWORD = process.env.DB_PASSWORD || 'db-password'

config.JWT_ENCRYPTION = process.env.JWT_ENCRYPTION || 'jwt_please_change'
config.JWT_EXPIRATION = process.env.JWT_EXPIRATION || '10000'

module.exports = config
