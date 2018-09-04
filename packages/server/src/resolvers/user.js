import { combineResolvers } from 'graphql-resolvers'
import { AuthenticationError, UserInputError } from 'apollo-server'
import { isAuthenticated, isAdmin } from './authorization'
import authService from '../services/auth'

export default {
  Query: {
    users: async (parent, args, { models }) => await models.User.findAll(),

    user: async (parent, { id }, { models }) => await models.User.findById(id),

    me: async (parent, args, { models, req }) => req.user || null,
  },

  Mutation: {
    signUp: async (parent, { username, email, password }, { models, req }) => {
      await authService.signUp({ models, username, email, password, req })
      return { token: 'registered' }
    },

    signIn: async (parent, { login, password }, { models, req }) => {
      await authService.signIn({ models, login, password, req })
      return { token: 'login' }
    },

    updateUser: combineResolvers(
      isAuthenticated,
      async (parent, { username }, { models, req }) => {
        const user = await models.User.findById(req.user.id)
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

    comments: async (user, args, { models }) =>
      await models.Comment.findAll({
        where: {
          userId: user.id,
        },
      }),
  },
}
