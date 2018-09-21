import passport from 'passport'
import nanoid from 'nanoid'
import bcrypt from 'bcrypt'
import mailer from '../config/mailer'
import redis from '../config/redis'
import User from '../models/user'
import { resetPassword, emailConfirmation } from '../constants/templates'

async function signUp({ email, username, password }, req) {
  await User.query().insert({ email, username, password })

  return User.query()
    .findOne({ email })
    .then(
      user =>
        new Promise((resolve, reject) => {
          req.login(user, async err => {
            if (err) reject(new Error(err))
            const token = nanoid(16)
            const link = `${process.env.HOST}/verify/${token}`
            const mailOptions = {
              from: `Shortstories <${process.env.SMTP_USER}>`,
              to: user.email,
              subject: 'Shortstories Email Verification',
              text: emailConfirmation(link),
            }
            mailer.sendMail(mailOptions, async err => {
              if (err) reject(new Error(err))
              await redis.set(token, user.id, 'ex', 60 * 60 * 24)
              resolve(user)
            })
          })
        })
    )
}

function signIn({ login, password }, req) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (err) reject(new Error(err))
      if (!user) reject(new Error('Invalid credentials.'))
      req.login(user, () => resolve(user))
    })({ body: { login, password } })
  })
}

async function verifyUser(parent, { token }) {
  const userId = await redis.get(token)
  if (userId) {
    await User.query().updateAndFetchById(userId, {
      isVerified: true,
    })
    await redis.del(token)
    return true
  }
  return false
}

async function forgotPassword(parent, { email }) {
  const user = await User.query().where({ email })
  const token = nanoid(16)
  await redis.set(`reset_password:${token}`, user.id, 'ex', 60 * 20)
  const link = `${process.env.HOST}/reset/${token}`
  const mailOptions = {
    from: `Shortstories <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: 'Shortstories Password Reset',
    text: resetPassword(link),
  }
  mailer.sendMail(mailOptions)
  return true
}

async function changePassword(parent, { token, newPassword }) {
  const userId = await redis.get(`reset_password:${token}`)
  if (userId) {
    const saltRounds = 10
    const hash = await bcrypt.hash(newPassword, saltRounds)
    await redis.del(`reset_password:${token}`)
    return await User.query().updateAndFetchById(userId, { newPassword: hash })
  }
  return [
    {
      path: 'changePassword',
      message: 'Invalid Token',
    },
  ]
}

export default {
  signIn,
  signUp,
  verifyUser,
  forgotPassword,
  changePassword,
}
