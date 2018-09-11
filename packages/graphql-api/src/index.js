import 'dotenv/config'
import './services/auth'
import path from 'path'
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

const RedisStore = connectRedis(session)

const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cookieParser())
app.use(
  session({
    store: new RedisStore({
      url: process.env.REDIS_URI,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
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
        me: req.user,
        req,
        loaders: {
          user: new DataLoader(keys => loaders.batchUsers(keys, models)),
        },
      }
    }
    return undefined
  },
})

server.applyMiddleware({ app, path: '/graphql' })

app.use('/img/photos', express.static(path.join(__dirname, 'uploads')))

const isTest = !!process.env.TEST_DATABASE
const isProduction = !!process.env.DATABASE_URL
const port = process.env.PORT || 8000

sequelize.sync({ force: isTest || isProduction }).then(async () => {
  app.listen({ port }, () => {
    // eslint-disable-next-line
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  })
})
