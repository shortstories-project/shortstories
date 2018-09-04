import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import connectRedis from 'connect-redis'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import DataLoader from 'dataloader'
import { ApolloServer } from 'apollo-server-express'
import schema from './schema'
import resolvers from './resolvers'
import models, { sequelize } from './models'
import loaders from './loaders'
import passportConfig from './services/auth' // eslint-disable-line

const RedisStore = connectRedis(session)

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true,
}))
app.use(cookieParser())
app.use(
  session({
    store: new RedisStore({
      url: process.env.REDIS_URI,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '')
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
      return {
        models,
        req,
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
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  })
})
