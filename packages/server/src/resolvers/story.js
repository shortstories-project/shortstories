import Sequelize from 'sequelize'
import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isStoryOwner } from './authorization'
import { toCursorHash, fromCursorHash } from '../utils'

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
      const lastStory = edges[edges.length - 1]
      const endCursor = lastStory
        ? toCursorHash(edges[edges.length - 1].createdAt.toString())
        : ''
      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor,
        },
      }
    },

    story: async (parent, { id }, { models }) => {
      const story = await models.Story.findById(id)
      return story
    },
  },

  Mutation: {
    createStory: combineResolvers(
      isAuthenticated,
      async (parent, { title, body }, { models, me }) => {
        const story = await models.Story.create({
          title,
          body,
          userId: me.id,
        })
        return story
      }
    ),

    updateStory: combineResolvers(
      isAuthenticated,
      isStoryOwner,
      async (
        parent,
        { id, title, body, likes, dislikes, views },
        { models }
      ) => {
        const story = await models.Story.findById(id)
        const fields = [title, body, likes, dislikes, views]
        fields.forEach(field => {
          if (field !== undefined) {
            story[field] = field
          }
        })
        return await story.save()
      }
    ),

    deleteStory: combineResolvers(
      isAuthenticated,
      isStoryOwner,
      async (parent, { id }, { models }) => {
        const isDeleted = await models.Story.destroy({ where: { id } })
        return isDeleted
      }
    ),
  },

  Story: {
    user: async (story, args, { loaders }) =>
      await loaders.user.load(story.userId),

    comments: async (story, args, { models }) =>
      await models.Comment.findAll({
        where: {
          storyId: story.id,
        },
      }),
  },
}
