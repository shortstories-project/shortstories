import { Op } from 'sequelize'

const batchUsers = async (keys, models) => {
  const users = await models.User.findAll({
    where: {
      id: {
        [Op.in]: keys,
      },
    },
  })
  return keys.map(key => users.find(user => user.id === key))
}

export default batchUsers
