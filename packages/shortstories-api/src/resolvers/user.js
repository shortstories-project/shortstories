import path from 'path'
import fs from 'fs'
import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated } from './authorization'
import authService from '../services/auth'
import { uploadPhoto } from '../utils'

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
