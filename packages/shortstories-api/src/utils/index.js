import fs from 'fs'
import gm from 'gm'
import nanoid from 'nanoid'
import path from 'path'

export const toCursorHash = string => Buffer.from(string).toString('base64')

export const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii')

export const uploadPhoto = (stream, filename, { width, height, x, y }) => {
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

export const paginationHelper = model => async ({ cursor, limit }) => {
  const items = cursor
    ? await model
        .query()
        .orderBy('createdAt', 'desc')
        .limit(limit + 1)
        .where('createdAt', '<', fromCursorHash(cursor))
    : await model
        .query()
        .orderBy('createdAt', 'desc')
        .limit(limit + 1)
  const hasNextPage = items.length > limit
  const edges = hasNextPage ? items.slice(0, -1) : items
  const lastIndex = edges.length - 1
  const lastItem = edges[lastIndex]
  const endCursor = lastItem
    ? toCursorHash(edges[lastIndex].createdAt.toString())
    : ''
  return {
    edges,
    pageInfo: {
      hasNextPage,
      endCursor,
    },
  }
}

export const reactionHandler = (
  parent,
  { id },
  { models, me }
) => async state => {
  async function createReaction() {
    const newReaction = await models.Reaction.query().insert({
      userId: me.id,
      storyId: id,
      state,
    })
    return {
      id: newReaction.id,
      state: newReaction.state,
      storyId: newReaction.storyId,
      user: await models.User.query().findById(newReaction.userId),
    }
  }
  async function updateReaction(id, newState) {
    const updatedReaction = await models.Reaction.query().updateAndFetchById(
      id,
      { state: newState }
    )
    return {
      id: updatedReaction.id,
      state: updatedReaction.state,
      storyId: updatedReaction.storyId,
      user: await models.User.query().findById(updatedReaction.userId),
    }
  }
  const [reaction] = await models.Reaction.query().where({
    userId: me.id,
    storyId: id,
  })
  if (reaction && reaction.state === state) {
    await models.Reaction.query().deleteById(reaction.id)
    return {
      id: reaction.id,
      state: reaction.state,
      storyId: reaction.storyId,
      user: await models.User.query().findById(reaction.userId),
    }
  }
  if (reaction && reaction.state !== state) {
    return updateReaction(reaction.id, state)
  }
  return createReaction()
}
