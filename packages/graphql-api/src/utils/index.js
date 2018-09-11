import fs from 'fs'
import nanoid from 'nanoid'
import path from 'path'

const toCursorHash = string => Buffer.from(string).toString('base64')

const fromCursorHash = string => Buffer.from(string, 'base64').toString('ascii')

const uploadAvatar = (stream) => {
  const id = nanoid()
  const filePath = path.join(__dirname, '..', 'uploads', `${id}.jpg`)
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated) {
          fs.unlinkSync(filePath)
        }
        reject(error)
      })
      .pipe(fs.createWriteStream(filePath))
      .on('error', error => reject(error))
      .on('finish', () => resolve(filePath))
  )
}

export { toCursorHash, fromCursorHash, uploadAvatar }
