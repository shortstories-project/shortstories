import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isCommentOwner } from './authorization'
import { paginationHelper } from '../utils'

export default {
  Query: {
    comments: async (parent, { cursor, limit = 10 }, { models }) =>
      paginationHelper(models.Comment)({ cursor, limit }),

    comment: async (parent, { id }, { models }) =>
      await models.Comment.query().findById(id),
  },

  Mutation: {
    createComment: combineResolvers(
      isAuthenticated,
      async (parent, { body, id }, { models, me }) =>
        await models.Comment.query().insert({
          userId: me.id,
          storyId: id,
          body,
        })
    ),

    updateComment: combineResolvers(
      isAuthenticated,
      isCommentOwner,
      async (parent, { id, body }, { models }) =>
        await models.Comment.query().updateAndFetchById(id, { body })
    ),

    deleteComment: combineResolvers(
      isAuthenticated,
      isCommentOwner,
      async (parent, { id }, { models }) =>
        await models.Comment.query()
          .delete()
          .where({ id })
    ),
  },

  Comment: {
    user: async (comment, args, { loaders }) =>
      await loaders.user.load(comment.userId),
  },
}
