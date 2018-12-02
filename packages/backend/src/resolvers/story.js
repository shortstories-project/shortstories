import Sequelize from 'sequelize'
import { combineResolvers } from 'graphql-resolvers'
import { last, map, filter, length } from 'ramda'
import { isAuthenticated, isStoryOwner } from './authorization'
import { LIKE, DISLIKE } from '../constants'

const toCursorHash = string => Buffer.from(string).toString('base64')

const fromCursorHash = string => Buffer.from(string, 'base64').toString('ascii')

export default {
  Query: {
    stories: async (
      parens,
      { cursor, limit, userId, isLiked },
      { models, request }
    ) => {
      const cursorOptions = cursor
        ? {
            createdAt: {
              [Sequelize.Op.lt]: fromCursorHash(cursor),
            },
          }
        : {}
      const defaultOptions = {
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
      }
      let stories
      if (isLiked) {
        const likes = await models.Reaction.findAll({
          where: {
            userId: request.userId,
            state: LIKE,
          },
        })
        const ids = map(i => i.storyId, likes)
        stories = await models.Story.findAll({
          ...defaultOptions,
          where: {
            ...cursorOptions,
            id: {
              [Sequelize.Op.in]: ids,
            },
          },
        })
      } else if (userId) {
        stories = await models.Story.findAll({
          ...defaultOptions,
          where: {
            ...cursorOptions,
            userId,
          },
        })
      } else {
        stories = await models.Story.findAll({
          ...defaultOptions,
          where: {
            ...cursorOptions,
          },
        })
      }
      const hasNextPage = stories.length > limit
      const edges = hasNextPage ? stories.slice(0, -1) : stories
      const lastStory = last(edges)
      const endCursor = lastStory
        ? toCursorHash(lastStory.createdAt.toString())
        : ''
      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor,
        },
      }
    },

    reactions: async (parent, { storyId }, { models }) =>
      await models.Reaction.findAll({
        where: {
          storyId,
        },
      }),

    story: async (parent, { id }, { models }) =>
      await models.Story.findByPk(id),
  },

  Mutation: {
    createStory: combineResolvers(
      isAuthenticated,
      async (parent, args, ctx) =>
        await ctx.models.Story.create({
          ...args,
          userId: ctx.request.userId,
        })
    ),

    updateStory: combineResolvers(
      isAuthenticated,
      isStoryOwner,
      async (parent, { id, title, body }, ctx) => {
        const story = await ctx.models.Story.findByPk(id)
        return await story.update({ title, body })
      }
    ),

    likeStory: combineResolvers(isAuthenticated, async (parent, args, ctx) => {
      const reaction = await ctx.models.Reaction.findOne({
        where: {
          userId: ctx.request.userId,
          storyId: args.id,
        },
      })
      if (reaction) {
        const state = reaction.get('state')
        if (state === LIKE) {
          await ctx.models.Reaction.destroy({
            where: {
              id: reaction.id,
              state: LIKE,
            },
          })
          return reaction
        }
        if (state === DISLIKE) {
          return await reaction.update({
            state: LIKE,
          })
        }
      }
      return await ctx.models.Reaction.create({
        userId: ctx.request.userId,
        storyId: args.id,
        state: LIKE,
      })
    }),

    dislikeStory: combineResolvers(
      isAuthenticated,
      async (parent, args, ctx) => {
        const reaction = await ctx.models.Reaction.findOne({
          where: {
            userId: ctx.request.userId,
            storyId: args.id,
          },
        })
        if (reaction) {
          const state = reaction.get('state')
          if (state === LIKE) {
            return await reaction.update({
              state: DISLIKE,
            })
          }
          await ctx.models.Reaction.destroy({
            where: {
              id: reaction.id,
              state: DISLIKE,
            },
          })
          return reaction
        }
        return await ctx.models.Reaction.create({
          userId: ctx.request.userId,
          storyId: args.id,
          state: DISLIKE,
        })
      }
    ),

    viewStory: combineResolvers(isAuthenticated, async (parent, args, ctx) => {
      const view = await ctx.models.View.create({
        userId: ctx.request.userId,
        storyId: args.id,
      })
      return view
    }),

    deleteStory: combineResolvers(
      isAuthenticated,
      isStoryOwner,
      async (parent, args, ctx) =>
        await ctx.models.Story.destroy({
          where: {
            id: args.id,
          },
        })
    ),
  },

  Story: {
    user: async (story, args, { models }) => {
      const user = await models.User.findByPk(story.userId)
      return user
    },

    stats: async (story, args, { models }) => {
      const options = {
        where: { storyId: story.id },
      }
      const reactions = await models.Reaction.findAll(options)
      const comments = await models.Comment.findAll(options)
      return {
        likes: length(filter(reaction => reaction.state === LIKE, reactions)),
        dislikes: length(filter(reaction => reaction.state === DISLIKE, reactions)),
        comments: length(comments),
      }
    },
  },
}
