import { Op } from 'sequelize'
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
                [Op.lt]: fromCursorHash(cursor),
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
        const createLike = async () => {
          const newLike = await models.Like.create({
            userId: me.id,
            storyId: id,
          })
          return {
            id: newLike.id,
            user: me,
            storyId: id,
          }
        }
        const like = await models.Like.findOne(selector)
        const dislike = await models.Dislike.findOne(selector)
        if (like) {
          const { id, storyId } = like
          await models.Like.destroy(selector)
          return {
            id,
            user: me,
            storyId,
          }
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
        const createDislike = async () => {
          const newDislike = await models.Dislike.create({
            userId: me.id,
            storyId: id,
          })
          return {
            id: newDislike.id,
            user: me,
            storyId: id,
          }
        }
        const like = await models.Like.findOne(selector)
        const dislike = await models.Dislike.findOne(selector)
        if (dislike) {
          const { id, storyId } = dislike
          await models.Dislike.destroy(selector)
          return {
            id,
            user: me,
            storyId,
          }
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
        const newView = await models.View.create({
          userId: me.id,
          storyId: id,
        })
        return {
          id: newView.id,
          user: me,
          storyId: id,
        }
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

    likedBy: async (story, args, { models, loaders }) =>
      await models.Like.findAll({
        where: {
          storyId: story.id,
        },
      }).map(async i => ({
        id: i.id,
        user: await loaders.user.load(i.userId),
        storyId: i.storyId,
      })),

    dislikedBy: async (story, args, { models, loaders }) =>
      await models.Dislike.findAll({
        where: {
          storyId: story.id,
        },
      }).map(async i => ({
        id: i.id,
        user: await loaders.user.load(i.userId),
        storyId: i.storyId,
      })),

    viewedBy: async (story, args, { models, loaders }) =>
      await models.View.findAll({
        where: {
          storyId: story.id,
        },
      }).map(async i => ({
        id: i.id,
        user: await loaders.user.load(i.userId),
        storyId: i.storyId,
      })),
  },
}
