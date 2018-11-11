import { Op } from 'sequelize'

export const batchStories = async (keys, models) => {
  const stories = await models.Story.findAll({
    where: {
      userId: {
        [Op.in]: keys,
      },
    },
  })

  console.log(12312312323, keys.map(key => stories.find(story => story.userId === key)))

  return keys.map(key => stories.find(story => story.userId === key))
}
