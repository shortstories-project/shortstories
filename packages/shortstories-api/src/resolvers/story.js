import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isStoryOwner } from './authorization'
import { paginationHelper } from '../utils'
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
          user_id: req.user.id,
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

    likeStory: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models, me }) => {
        const reaction = await models.Reaction.query().where({
          user_id: me.id,
          story_id: id,
        })
        const createLike = async () =>
          await models.Reaction.query().insert({
            user_id: me.id,
            story_id: id,
            state: LIKE,
          })
        if (reaction) {
          await models.Reaction.query()
            .delete()
            .where({ user_id: me.id, story_id: id })
          if (reaction.state === DISLIKE) {
            return createLike()
          }
          return reaction
        }
        return createLike()
      }
    ),

    dislikeStory: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models, me }) => {
        const reaction = await models.Reaction.query().where({
          user_id: me.id,
          story_id: id,
        })
        const createDislike = async () =>
          await models.Reaction.query().insert({
            user_id: me.id,
            story_id: id,
            state: DISLIKE,
          })
        if (reaction) {
          await models.Reaction.query()
            .delete()
            .where({ user_id: me.id, story_id: id })
          if (reaction.state === LIKE) {
            return createDislike()
          }
          return reaction
        }
        return createDislike()
      }
    ),

    viewStory: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models, me }) =>
        await models.Reaction.query().insert({
          user_id: me.id,
          story_id: id,
          state: DISLIKE,
        })
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
      await loaders.user.load(story['user_id']),

    comments: async (story, args, { models }) =>
      await models.Comment.query().where({ story_id: story.id }),

    likedBy: async (story, args, { models, loaders }) =>
      await models.Reaction.query()
        .where({ story_id: story.id, state: LIKE })
        .map(async like => ({
          id: like.id,
          user: await loaders.user.load(like['user_id']),
          storyId: like['story_id'],
        })),

    dislikedBy: async (story, args, { models, loaders }) =>
      await models.Reaction.query()
        .where({ story_id: story.id, state: DISLIKE })
        .map(async dislike => ({
          id: dislike.id,
          user: await loaders.user.load(dislike['user_id']),
          storyId: dislike['story_id'],
        })),

    viewedBy: async (story, args, { models, loaders }) =>
      await models.View.query()
        .where({ story_id: story.id })
        .map(async view => ({
          id: view.id,
          user: await loaders.user.load(view['user_id']),
          storyId: view['story_id'],
        })),
  },
}
