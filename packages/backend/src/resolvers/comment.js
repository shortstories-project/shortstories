import Sequelize from 'sequelize'
import { combineResolvers } from 'graphql-resolvers'
import { last } from 'ramda'
import { isAuthenticated, isCommentOwner } from './authorization'

const toCursorHash = string => Buffer.from(string).toString('base64')

const fromCursorHash = string => Buffer.from(string, 'base64').toString('ascii')

export default {
  Query: {
    comments: async (parent, { cursor, limit, storyId }, { models }) => {
      const cursorOptions = cursor
        ? {
            createdAt: {
              [Sequelize.Op.lt]: fromCursorHash(cursor),
            },
          }
        : {}
      const comments = await models.Comment.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        where: {
          ...cursorOptions,
          storyId,
        },
      })
      const hasNextPage = comments.length > limit
      const edges = hasNextPage ? comments.slice(0, -1) : comments
      const lastComment = last(comments)
      const endCursor = lastComment
        ? toCursorHash(lastComment.createdAt.toString())
        : ''
      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor,
        },
      }
    },

    comment: async (parent, args, ctx) =>
      await ctx.models.Comment.findByPk(args.id),
  },

  Mutation: {
    createComment: combineResolvers(
      isAuthenticated,
      async (parent, { body, id }, ctx) =>
        await ctx.models.Comment.create({
          userId: ctx.request.userId,
          storyId: id,
          body,
        })
    ),

    updateComment: combineResolvers(
      isAuthenticated,
      isCommentOwner,
      async (parent, { id, body }, ctx) => {
        const comment = ctx.models.Comment.findByPk(id)
        return comment.update({ body })
      }
    ),

    deleteComment: combineResolvers(
      isAuthenticated,
      isCommentOwner,
      async (parent, { id }, ctx) =>
        await ctx.models.Comment.destroy({
          where: {
            id,
          },
        })
    ),
  },

  Comment: {
    user: async (story, args, { models }) => {
      const user = await models.User.findByPk(story.userId)
      return user
    },
  },
}
