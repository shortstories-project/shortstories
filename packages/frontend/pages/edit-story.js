import PropTypes from 'prop-types'
import StoryCreator from '../components/StoryCreator'

function EditStory({ query }) {
  return (
    <div>
      <StoryCreator id={query.id} />
    </div>
  )
}

EditStory.propTypes = {
  query: PropTypes.shape().isRequired,
}

export default EditStory
