import Sequelize from 'sequelize'
import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isStoryOwner } from './authorization'

const toCursorHash = string => Buffer.from(string).toString('base64')
const fromCursorHash = string => Buffer.from(string, 'base64').toString('ascii')

export default {
  Query: {
    stories: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor),
              },
            },
          }
        : {}
      const stories = await models.Story.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      })
      const hasNextPage = stories.length > limit
      const edges = hasNextPage ? stories.slice(0, -1) : stories

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString()),
        },
      }
    },

    story: async (parent, { id }, { models }) => {
      console.log(models)
      const story = await models.Story.findById(id)
      return story
    },
  },
  Mutation: {
    createStory: combineResolvers(isAuthenticated, async (parent, { title, body }, { models, me }) => {
      const story = await models.Story.create({
        title,
        body,
        userId: me.id,
      })

      return story
    }),

    deleteStory: combineResolvers(isAuthenticated, isStoryOwner, async (parent, { id }, { models }) => {
      const isDeleted = await models.Story.destroy({ where: { id } })
      return isDeleted
    }),
  },
  Story: {
    user: async (story, args, { loaders }) =>
      await loaders.user.load(story.userId),
  },
}
