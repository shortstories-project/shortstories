import fs from 'fs'
import gm from 'gm'
import nanoid from 'nanoid'
import path from 'path'

const toCursorHash = string => Buffer.from(string).toString('base64')

const fromCursorHash = string => Buffer.from(string, 'base64').toString('ascii')

const uploadPhoto = (stream, filename, { width, height, x, y }) => {
  const id = nanoid()
  const fileExt = path.extname(filename)
  const filePath = path.join(__dirname, '..', 'uploads', `${id}${fileExt}`)
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
      .on('finish', () => {
        gm(filePath)
          .crop(width, height, x, y)
          .compress('BZip')
          .write(filePath, error => {
            if (error) {
              reject(error)
            } else {
              const { base } = path.parseFloat(filePath)
              resolve(`/img/photos/${base}`)
            }
          })
      })
  )
}

export { toCursorHash, fromCursorHash, uploadPhoto }
