import fs from 'fs'
import gm from 'gm'
import nanoid from 'nanoid'
import path from 'path'

export default function uploadPhoto(stream, filename, { width, height, x, y }) {
  const id = nanoid(10)
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
              const { base } = path.parse(filePath)
              resolve(`/img/photos/${base}`)
            }
          })
      })
  )
}
