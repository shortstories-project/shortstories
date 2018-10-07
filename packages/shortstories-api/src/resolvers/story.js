import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isStoryOwner } from './authorization'
import { paginationHelper, reactionHandler } from '../utils'
import { LIKE, DISLIKE } from '../constants'

export default {
  Query: {
    stories: async (parens, { cursor, limit = 100 }, { models }) =>
      paginationHelper(models.Story)({ cursor, limit }),

    story: async (parent, { id }, { models }) =>
      await models.Story.query().findById(id),
  },

  Mutation: {
    createStory: combineResolvers(
      isAuthenticated,
      async (parent, { title, body }, { models, req }) =>
        await models.Story.query().insert({
          title,
          body,
          userId: req.user.id,
        })
    ),

    updateStory: combineResolvers(
      isAuthenticated,
      isStoryOwner,
      async (parent, { id, title, body }, { models }) => {
        const changes = {}
        const fields = [title, body]
        fields.forEach(field => {
          if (field !== undefined) {
            changes[field] = field
          }
        })
        return await models.Story.query().updateAndFetchById(id, changes)
      }
    ),

    likeStory: combineResolvers(isAuthenticated, (...args) =>
      reactionHandler(...args)(LIKE)
    ),

    dislikeStory: combineResolvers(isAuthenticated, (...args) =>
      reactionHandler(...args)(DISLIKE)
    ),

    viewStory: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models, me }) => {
        const newView = await models.View.query().insert({
          userId: me.id,
          storyId: id,
        })
        return {
          id: newView.id,
          user: await models.User.query().findById(newView.userId),
          storyId: newView.storyId,
        }
      }
    ),

    deleteStory: combineResolvers(
      isAuthenticated,
      isStoryOwner,
      async (parent, { id }, { models }) =>
        await models.Story.query()
          .delete()
          .where({ id })
    ),
  },

  Story: {
    user: async (story, args, { loaders }) =>
      await loaders.user.load(story.userId),

    comments: async (story, args, { models }) =>
      await models.Comment.query().where({ storyId: story.id }),

    likedBy: async (story, args, { models, loaders }) =>
      await models.Reaction.query()
        .where({ storyId: story.id, state: LIKE })
        .map(async like => ({
          id: like.id,
          user: await loaders.user.load(like.userId),
          storyId: like.storyId,
        })),

    dislikedBy: async (story, args, { models, loaders }) =>
      await models.Reaction.query()
        .where({ storyId: story.id, state: DISLIKE })
        .map(async dislike => ({
          id: dislike.id,
          user: await loaders.user.load(dislike.userId),
          storyId: dislike.storyId,
        })),

    viewedBy: async (story, args, { models, loaders }) =>
      await models.View.query()
        .where({ storyId: story.id })
        .map(async view => ({
          id: view.id,
          user: await loaders.user.load(view.userId),
          storyId: view.storyId,
        })),
  },
}
