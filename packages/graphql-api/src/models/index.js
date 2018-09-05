import Sequelize from 'sequelize'

let sequelize

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
  })
} else {
  sequelize = new Sequelize(
    process.env.TEST_DATABASE || process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: 'postgres',
      operatorsAliases: false,
    }
  )
}

const models = {
  User: sequelize.import('./user'),
  Story: sequelize.import('./story'),
  Comment: sequelize.import('./comment'),
  Like: sequelize.import('./like'),
  Dislike: sequelize.import('./dislike'),
  View: sequelize.import('./view'),
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

export { sequelize }

export default models
