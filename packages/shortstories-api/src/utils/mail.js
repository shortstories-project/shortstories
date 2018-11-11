import nodemailer from 'nodemailer'

export const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.SMTP_USER,
    clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_SECRET,
    refreshToken: process.env.GOOGLE_AUTH_REFRESH_TOKEN,
  },
})

export const makeANiceEmail = text => `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Hello There!</h2>
    <p>${text}</p>
    <p>😘, Shortstories team</p>
  </div>
`
