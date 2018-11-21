import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isCommentOwner } from './authorization'
import pagination from '../utils/pagination'

export default {
  Query: {
    comments: async (parent, { cursor, limit = 10 }, ctx) =>
      pagination(ctx.models.Comment, cursor, limit),

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
    user: async (comment, args, { loaders }) =>
      await loaders.user.load(comment.userId),
  },
}
