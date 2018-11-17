import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isStoryOwner } from './authorization'
import reactionHandler from '../utils/reaction-handler'
import pagination from '../utils/pagination'
import { LIKE, DISLIKE } from '../constants'

export default {
  Query: {
    stories: async (parens, { cursor, limit = 100 }, ctx) =>
      pagination(ctx.models.Story, cursor, limit),

    story: async (parent, args, ctx) =>
      await ctx.models.Story.findByPk(args.id),
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

    likeStory: combineResolvers(isAuthenticated, (parent, args, ctx) =>
      reactionHandler(args.id, ctx, LIKE)
    ),

    dislikeStory: combineResolvers(isAuthenticated, (parent, args, ctx) =>
      reactionHandler(args.id, ctx, DISLIKE)
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
    user: async (story, args, ctx) => await ctx.loaders.user.load(story.userId),

    comments: async (story, args, ctx) =>
      await ctx.models.Comment.findAll({
        where: {
          storyId: story.id,
        },
      }),

    likedBy: async (story, args, ctx) =>
      await ctx.models.Reaction.findAll({
        where: {
          storyId: story.id,
          state: LIKE,
        },
      }),

    dislikedBy: async (story, args, ctx) =>
      await ctx.models.Reaction.findAll({
        where: {
          storyId: story.id,
          state: DISLIKE,
        },
      }),

    viewedBy: async (story, args, ctx) =>
      await ctx.models.View.findAll({
        where: {
          storyId: story.id,
        },
      }),
  },
}
