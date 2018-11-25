import PropTypes from 'prop-types'
import SingleStory from '../components/SingleStory'

const Story = ({ query }) => (
  <div>
    <SingleStory id={query.id} />
  </div>
)

Story.propTypes = {
  query: PropTypes.shape().isRequired,
}

export default Story
