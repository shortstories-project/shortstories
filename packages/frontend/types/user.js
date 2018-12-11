import { shape, string } from 'prop-types'

export default shape({
  id: string.isRequired,
  photo: string.isRequired,
  username: string.isRequired,
})
