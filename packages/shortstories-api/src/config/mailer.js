import nodemailer from 'nodemailer'

const mailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.SMTP_USER,
    clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_SECRET,
    refreshToken: process.env.GOOGLE_AUTH_REFRESH_TOKEN,
  },
})

export default mailer
