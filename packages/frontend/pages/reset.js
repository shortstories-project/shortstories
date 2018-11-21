import styled from 'styled-components'
import PropTypes from 'prop-types'
import Reset from '../components/Reset'

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 380px));
  justify-content: center;
`

const ResetPage = ({ query }) => (
  <Columns>
    <Reset token={query.resetToken} />
  </Columns>
)

ResetPage.propTypes = {
  query: PropTypes.shape({
    resetToken: PropTypes.string.isRequired,
  }).isRequired,
}

export default ResetPage
