import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isAdmin } from './authorization'
import authService from '../services/auth'

export default {
  Query: {
    users: async (parent, args, { models }) => await models.User.findAll(),

    user: async (parent, { id }, { models }) => await models.User.findById(id),

    me: async (parent, args, { me }) => me || null,
  },

  Mutation: {
    signUp: async (parent, { username, email, password }, { req }) =>
      await authService.signUp({ username, email, password, req }),

    signIn: async (parent, { login, password }, { req }) =>
      await authService.signIn({ login, password, req }),

    signOut: (parent, args, { req }) => {
      const { user } = req
      req.session.destroy()
      req.logout()
      return user
    },

    updateUser: combineResolvers(
      isAuthenticated,
      async (parent, { username }, { models, me }) => {
        const user = await models.User.findById(me.id)
        return await user.update({ username })
      }
    ),

    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) =>
        await models.User.destroy({
          where: { id },
        })
    ),
  },

  User: {
    stories: async (user, args, { models }) =>
      await models.Story.findAll({
        where: {
          userId: user.id,
        },
      }),
  },
}
