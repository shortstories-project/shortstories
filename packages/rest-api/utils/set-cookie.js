function setCookie(res, token) {
  return res.status(200).cookie('token', token, { maxAge: 2147483647 })
}

module.exports = setCookie
