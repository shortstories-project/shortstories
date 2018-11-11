import { Op } from 'sequelize'

export const toCursorHash = string => Buffer.from(string).toString('base64')

export const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii')

export default async function pagination(model, cursor, limit) {
  const cursorOptions = cursor
    ? {
        where: {
          createdAt: {
            [Op.lt]: fromCursorHash(cursor),
          },
        },
      }
    : {}
  const items = await model.findAll({
    order: [['createdAt', 'DESC']],
    limit: limit + 1,
    ...cursorOptions,
  })
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
