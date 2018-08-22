function makeResponse(res, code, message, data = undefined) {
  return res.status(code).send({
    code,
    message,
    data,
  })
}

module.exports = makeResponse
