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
      async (parent, { title, body }, { models, req }) => {
        const story = await models.Story.create({
          title,
          body,
          userId: req.user.id,
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

    likeStory: combineResolvers(
      isAuthenticated,
      isStoryOwner,
      async (parent, { id }, { models, me }) => {
        const selector = {
          where: {
            userId: me.id,
            storyId: id,
          },
        }
        const story = await models.Story.findById(id)
        const createLike = async () => {
          await models.Like.create({
            userId: me.id,
            storyId: id,
          })
          return story
        }
        const like = await models.Like.findOne(selector)
        const dislike = await models.Dislike.findOne(selector)
        if (like) {
          await models.Like.destroy(selector)
          return story
        }
        if (dislike) {
          await models.Dislike.destroy(selector)
          return createLike()
        }
        return createLike()
      }
    ),

    dislikeStory: combineResolvers(
      isAuthenticated,
      isStoryOwner,
      async (parent, { id }, { models, me }) => {
        const selector = {
          where: {
            userId: me.id,
            storyId: id,
          },
        }
        const story = await models.Story.findById(id)
        const createDislike = async () => {
          await models.Dislike.create({
            userId: me.id,
            storyId: id,
          })
          return story
        }
        const like = await models.Like.findOne(selector)
        const dislike = await models.Dislike.findOne(selector)
        if (dislike) {
          await models.Dislike.destroy(selector)
          return story
        }
        if (like) {
          await models.Like.destroy(selector)
          return createDislike()
        }
        return createDislike()
      }
    ),

    viewStory: combineResolvers(
      isAuthenticated,
      isStoryOwner,
      async (parent, { id }, { models, me }) => {
        const story = await models.Story.findById(id)
        await models.View.create({
          userId: me.id,
          storyId: id,
        })
        return story
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

    likedBy: async (story, args, { models }) => {
      const likes = await models.Like.findAll({
        where: {
          storyId: story.id,
        },
      })
      const userIds = likes.map(like => like.userId)
      return await models.User.findAll({
        where: {
          id: userIds,
        },
      })
    },

    dislikedBy: async (story, args, { models }) => {
      const dislikes = await models.Dislike.findAll({
        where: {
          storyId: story.id,
        },
      })
      const userIds = dislikes.map(dislike => dislike.userId)
      return await models.User.findAll({
        where: {
          id: userIds,
        },
      })
    },

    viewedBy: async (story, args, { models }) => {
      const views = await models.View.findAll({
        where: {
          storyId: story.id,
        },
      })
      const userIds = views.map(view => view.userId)
      return await models.User.findAll({
        where: {
          id: userIds,
        },
      })
    },
  },
}
