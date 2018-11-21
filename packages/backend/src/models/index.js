import Sequelize from 'sequelize'
import logger from '../utils/logger'

const dbUri = process.env.TEST_DATABASE_URL || process.env.DATABASE_URL

const sequelize = new Sequelize(dbUri, {
  dialect: 'postgres',
  logging: msg => logger.info(msg),
})

const models = {
  User: sequelize.import('./user'),
  Story: sequelize.import('./story'),
  Reaction: sequelize.import('./reaction'),
  View: sequelize.import('./view'),
  Comment: sequelize.import('./comment'),
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

export { sequelize }

export default models
