import 'dotenv/config'
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import chalk from 'chalk'
import createServer from './createServer'
import models, { sequelize } from './models'

const server = createServer()

server.express.use(cookieParser())

server.express.use((req, res, next) => {
  const { token } = req.cookies
  if (token) {
    const { userId } = jwt.verify(token, process.env.SECRET)
    req.userId = userId
  }
  next()
})

server.express.use(async (req, res, next) => {
  if (!req.userId) return next()
  const user = await models.User.findByPk(req.userId)
  req.user = user
  next()
})

server.express.use(
  '/img/photos',
  express.static(path.join(__dirname, 'uploads'))
)

const isTest = !!process.env.TEST_DATABASE

sequelize.sync({ force: isTest }).then(async () => {
  server.start(
    {
      cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
      },
    },
    ({ port }) => {
      // eslint-disable-next-line
      console.log(
        `\n🔥 Server is now running on ${chalk.yellowBright(
          `http://localhost:${port}`
        )} 🔥`
      )
    }
  )
})
