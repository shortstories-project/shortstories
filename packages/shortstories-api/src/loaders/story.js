import { Op } from 'sequelize'

export const batchStories = async (keys, models) => {
  const stories = await models.Story.findAll({
    where: {
      userId: {
        [Op.in]: keys,
      },
    },
  })

  return keys.map(key => stories.find(story => story.userId === key))
}
