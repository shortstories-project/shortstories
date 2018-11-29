import PropTypes from 'prop-types'
import UserProfile from '../components/UserProfile'

function User({ query }) {
  return (
    <div>
      <UserProfile id={query.id} />
    </div>
  )
}

User.propTypes = {
  query: PropTypes.shape().isRequired,
}

export default User
