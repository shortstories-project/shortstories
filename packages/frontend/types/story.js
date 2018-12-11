import { shape, number, string } from 'prop-types'
import user from './user'

export default shape({
  id: string.isRequired,
  title: string.isRequired,
  body: string.isRequired,
  createdAt: string.isRequired,
  user: user.isRequired,
  stats: shape({
    comments: number,
    likes: number,
    dislikes: number,
  }),
})
