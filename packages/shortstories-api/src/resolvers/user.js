import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated } from './authorization'
import authService from '../services/auth'
import { uploadAvatar } from '../utils'

export default {
  Query: {
    me: (parent, args, { me }) => me,

    user: async (parent, { id }, { models }) => await models.User.findById(id),
  },

  Mutation: {
    signUp: async (parent, args, { req }) =>
      await authService.signUp(args, req),

    signIn: async (parent, args, { req }) =>
      await authService.signIn(args, req),

    signOut: combineResolvers(isAuthenticated, (parent, args, { req }) => {
      try {
        req.session.destroy()
        req.logout()
        return true
      } catch (e) {
        return false
      }
    }),

    updateUser: combineResolvers(
      isAuthenticated,
      async (parent, args, { models, me }) => {
        const user = await models.User.findById(me.id)
        return await user.update(args)
      }
    ),

    addAvatar: combineResolvers(
      isAuthenticated,
      async (parent, args, { models, me }) => {
        const user = await models.User.findById(me.id)
        const { stream } = await args.avatarImage
        const url = await uploadAvatar(stream)
        return await user.update({ avatar: url })
      }
    ),
  },

  User: {
    writtenStories: async (user, args, { models }) =>
      await models.Story.findAll({
        where: {
          userId: user.id,
        },
      }),
  },

  Me: {
    writtenStories: async (parent, args, { models, me }) =>
      await models.Story.findAll({
        where: {
          userId: me.id,
        },
      }),
    likedStories: async (parent, args, { models, me }) => {
      const likes = await models.Like.findAll({
        where: {
          userId: me.id,
        },
      })
      return await models.Story.findAll({
        where: likes.map(like => like.storyId),
      })
    },
    viewedStories: async (user, args, { models, me }) => {
      const views = await models.View.findAll({
        where: {
          userId: me.id,
        },
      })
      return await models.Story.findAll({
        where: views.map(view => view.storyId),
      })
    },
  },
}
