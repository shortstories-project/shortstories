import Sequelize from 'sequelize'
import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isCommentOwner } from './authorization'
import { toCursorHash, fromCursorHash } from '../utils'

export default {
  Query: {
    comments: async (parent, { cursor, limit = 10 }, { models }) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor),
              },
            },
          }
        : {}
      const comments = await models.Comment.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      })
      const hasNextPage = comments.length > limit
      const edges = hasNextPage ? comments.slice(0, -1) : comments
      const lastComment = edges[edges.length - 1]
      const endCursor = lastComment ? toCursorHash(lastComment.createdAt.toString()) : ''
      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor,
        },
      }
    },

    comment: async (parent, { id }, { models }) => {
      const comment = await models.Comment.findById(id)
      return comment
    },
  },
  Mutation: {
    createComment: combineResolvers(isAuthenticated, async (parent, { body, id }, { models, me }) => {
      const comment = await models.Comment.create({
        body,
        userId: me.id,
        storyId: id,
      })
      return comment
    }),
    updateComment: combineResolvers(isAuthenticated, isCommentOwner, async (parent, { id, body }, { models }) => {
      const comment = await models.Comment.findById(id)
      return await comment.update({ body })
    }),
    deleteComment: combineResolvers(isAuthenticated, isCommentOwner, async (parent, { id }, { models }) => {
      const isDeleted = await models.Comment.destroy({ where: { id } })
      return isDeleted
    }),
  },
  Comment: {
    user: async (comment, args, { loaders }) =>
      await loaders.user.load(comment.userId),
  },
}
