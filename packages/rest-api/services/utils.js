const { to } = require('await-to-js')
const parseError = require('parse-error')

module.exports.to = async promise => {
  let err, res
  ;[err, res] = await to(promise)
  if (err) return [parseError(err)]
  return [null, res]
}

module.exports.errorHandler = function(res, err, code) {
  if (typeof err === 'object' && typeof err.message !== 'undefined') {
    err = err.message
  }
  if (typeof code !== 'undefined') {
    res.statusCode = code
  }
  return res.json({ success: false, error: err })
}

module.exports.successHandler = function(res, data, code) {
  let sendData = { success: true }
  if (typeof data === 'object') {
    sendData = Object.assign(data, sendData)
  }
  if (typeof code !== 'undefined') {
    res.statusCode = code
  }
  return res.json(sendData)
}

module.exports.throwError = function throwError(msg, log) {
  if (log === true) {
    console.error(msg)
  }
  throw new Error(msg)
}
