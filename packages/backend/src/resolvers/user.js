import path from 'path'
import jwt from 'jsonwebtoken'
import nanoid from 'nanoid'
import { Op } from 'sequelize'
import fs from 'fs'
import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated } from './authorization'
import uploadPhoto from '../utils/photo'
import { transport, makeANiceEmail } from '../utils/mail'

export default {
  Query: {
    me: (parent, args, ctx) => ctx.request.user,

    user: async (parent, args, ctx) => await ctx.models.User.findByPk(args.id),
  },

  Mutation: {
    async signUp(parent, args, ctx) {
      args.email = args.email.toLowerCase()
      const verifyToken = nanoid(20)
      const user = await ctx.models.User.create({
        ...args,
        verifyToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour from now
      })
      const token = jwt.sign({ userId: user.id }, process.env.SECRET)
      ctx.response.cookie('token', token, {
        httpOnly: true,
        maxAge: 100 * 60 * 60 * 24 * 365, // 1 year cookie
      })
      await transport.sendMail({
        from: `Shortstories <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: 'Verify your account',
        html: makeANiceEmail(`Welcome to Shortstories! Verify we have the right email address by clicking on the link below:
        \n\n
        <a href="${
          process.env.FRONTEND_URL
        }/verify?verifyToken=${verifyToken}">Click Here to Verify</a>`),
      })
      return user
    },

    async signIn(parent, { login, password }, ctx) {
      const user = await ctx.models.User.findByLogin(login)
      if (!user) {
        throw new Error(`No such user found for login ${login}`)
      }
      const isValid = await user.validatePassword(password)
      if (!isValid) {
        throw new Error('Invalid Password!')
      }
      const token = jwt.sign({ userId: user.id }, process.env.SECRET)
      ctx.response.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      })
      return user
    },

    signOut(parent, args, ctx) {
      ctx.response.clearCookie('token')
      return {
        message: 'Goodbye!',
      }
    },

    async verifyUser(parent, args, ctx) {
      const user = await ctx.models.User.findOne({
        where: {
          verifyToken: args.token,
          verifyTokenExpiry: {
            [Op.gte]: Date.now() - 3600000,
          },
        },
      })
      if (!user) {
        throw new Error('This token is either invalid or expired!')
      }
      const verifiedUser = await user.update({
        isVerified: true,
        verifyToken: null,
        verifyTokenExpiry: null,
      })
      return verifiedUser
    },

    async requestReset(parent, args, ctx) {
      const user = await ctx.models.User.findByLogin(args.login)
      if (!user) {
        throw new Error(`No such user found for login ${args.login}`)
      }
      const resetToken = nanoid(20)
      const resetTokenExpiry = Date.now() + 3600000
      await user.update({
        resetToken,
        resetTokenExpiry,
      })
      await transport.sendMail({
        from: `Shortstories <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: 'Reset Password',
        html: makeANiceEmail(`Your Password Reset Token is here!
        \n\n
        <a href="${
          process.env.FRONTEND_URL
        }/reset?resetToken=${resetToken}">Click Here to Reset</a>`),
      })
      return {
        email: user.get('email'),
      }
    },

    async resetPassword(parent, args, ctx) {
      if (args.password !== args.passwordConfirmation) {
        throw new Error("Yo Passwords don't match!")
      }
      const user = await ctx.models.User.findOne({
        where: {
          resetToken: args.token,
          resetTokenExpiry: {
            [Op.gte]: Date.now() - 3600000,
          },
        },
      })
      if (!user) {
        throw new Error('This token is either invalid or expired!')
      }
      const passwordHash = await user.generatePasswordHash()
      const updatedUser = await user.update({
        password: passwordHash,
        resetToken: null,
        resetTokenExpiry: null,
      })
      const token = jwt.sign({ userId: updatedUser.id }, process.env.SECRET)
      ctx.response.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      })
      return updatedUser
    },

    updateUser: combineResolvers(
      isAuthenticated,
      async (parent, args, ctx) => await ctx.request.user.update(args)
    ),

    postPhoto: combineResolvers(isAuthenticated, async (parent, args, ctx) => {
      const me = ctx.request.user
      if (me.photo) {
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
      return await me.update({ photo: url })
    }),

    checkUserExist: async (parent, args, ctx) => {
      const user = await ctx.models.User.findByLogin(args.login)
      return !!user
    },
  },
}
