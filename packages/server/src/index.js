import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import DataLoader from 'dataloader'
import { ApolloServer } from 'apollo-server-express'
import { AuthenticationError } from 'apollo-server'
import schema from './schema'
import resolvers from './resolvers'
import models, { sequelize } from './models'
import loaders from './loaders'

const app = express()

app.use(cors())

const getMe = async req => {
  const token = req.headers['x-token']

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET)
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.')
    }
  }
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    const message = error.message.replace('SequelizeValidationError: ', '').replace('Validation error: ', '')
    return {
      ...error,
      message,
    }
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
      }
    }

    if (req) {
      const me = await getMe(req)
      return {
        models,
        me,
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader(keys => loaders.user.batchUsers(keys, models)),
        },
      }
    }
  },
})

server.applyMiddleware({ app, path: '/graphql' })

const isTest = !!process.env.TEST_DATABASE
const isProduction = !!process.env.DATABASE_URL
const port = process.env.PORT || 8000

sequelize.sync({ force: isTest || isProduction }).then(async () => {
  app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  })
})
