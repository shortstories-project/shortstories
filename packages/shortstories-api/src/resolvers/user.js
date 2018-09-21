import path from 'path'
import fs from 'fs'
import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated } from './authorization'
import authService from '../services/auth'
import { uploadPhoto } from '../utils'

export default {
  Query: {
    me: (parent, args, { me }) => me,

    user: async (parent, { id }, { models }) =>
      await models.User.query().findById(id),
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

    forgotPassword: authService.forgotPassword,

    changePassword: authService.changePassword,

    updateUser: combineResolvers(
      isAuthenticated,
      async (parent, args, { models, me }) => {
        const user = await models.User.findById(me.id)
        return await user.update(args)
      }
    ),

    postPhoto: combineResolvers(
      isAuthenticated,
      async (parent, args, { models, me }) => {
        const user = await models.User.findById(me.id)
        if (me.photo && me.photo !== '/img/assets/default.jpg') {
          const { base } = path.parse(me.photo)
          const photoPath = path.join(__dirname, '..', 'uploads', base)
          fs.unlinkSync(photoPath)
        }
        const { stream, filename } = await args.file
        const url = await uploadPhoto(stream, filename, {
          width: args.width,
          height: args.height,
          x: args.x,
          y: args.y,
        })
        return await user.update({ photo: url })
      }
    ),

    verifyUser: authService.verifyUser,
  },

  User: {
    writtenStories: async (user, args, { models }) =>
      await models.Story.query().where({ user_id: user.id }),
  },

  Me: {
    writtenStories: async (parent, args, { models, me }) =>
      await models.Story.query().where({ user_id: me.id }),

    likedStories: async (parent, args, { models, me }) => {
      const likes = await models.Reaction.query().where({
        user_id: me.id,
        state: 'like',
      })
      return await models.Story.query().findByIds(
        likes.map(like => like['story_id'])
      )
    },

    viewedStories: async (user, args, { models, me }) => {
      const views = await models.View.query().where({
        user_id: me.id,
      })
      return await models.Story.query().findByIds(
        views.map(view => view['story_id'])
      )
    },
  },
}
