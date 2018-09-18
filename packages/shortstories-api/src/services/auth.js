import passport from 'passport'
import redis from 'redis'
import nanoid from 'nanoid'
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple'
import isEqual from 'lodash.isequal'
import mailer from '../config/mailer'
import User from '../models/user'
import { getJWTSecret } from '../utils'
import { resetPassword } from '../constants/templates'

const redisClient = redis.createClient()

/* Scope functions [signUp, signIn, verify, sendConfirmEmail, restorePassword] */

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
            const mailOptions = {
              from: `Shortstories <${process.env.SMTP_USER}>`,
              to: user.email,
              subject: 'Nodemailer test',
              html: `
                <h3>Shortstories</h3>
                <p>Welcome to Shortstories</p>
                <p>Verify we have the right email address by clicking on the button below:</p>
                <a href="${
                  process.env.HOST
                }/verify?token=${token}">Verify my account!</a>
              `,
            }
            mailer.sendMail(mailOptions, err => {
              if (err) reject(new Error(err))
              redisClient.set(token, user.email)
              redisClient.expire(token, 3600)
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

function verifyUser(req, res, next) {
  redisClient.get(req.query.token, async (err, email) => {
    await User.query()
      .where({ email })
      .update({ is_verified: true })
    next()
  })
}

async function forgotPassword(parent, { email }) {
  const user = await User.query().where({ email })
  const payload = {
    id: user.id,
    email,
  }
  const secret = getJWTSecret(user)
  const token = jwt.encode(payload, secret)
  const link = `${process.env.HOST}/reset/${payload.id}/${token}`
  const mailOptions = {
    from: `Shortstories <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: 'Shortstories Password Reset',
    text: resetPassword(link),
  }
  mailer.sendMail(mailOptions, err => {
    if (err) return false
    return true
  })
}

async function changePassword(parent, { token, id, newPassword }) {
  const user = await User.query().findById(id)
  // TODO: Error handle
  const secret = getJWTSecret(user)
  const payload = {
    id: user.id,
    email: user.email,
  }
  if (isEqual(payload, jwt.decode(token, secret))) {
    const saltRounds = 10
    const hash = await bcrypt.hash(newPassword, saltRounds)
    return await user.update({ password: hash })
  }
  // TODO: Error handle
}

export default {
  signIn,
  signUp,
  verifyUser,
  forgotPassword,
  changePassword,
}
