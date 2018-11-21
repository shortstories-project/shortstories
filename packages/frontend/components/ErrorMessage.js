import styled from 'styled-components'
import PropTypes from 'prop-types'

const ErrorStyles = styled.div`
  padding: 1rem;
  padding-left: 1rem;
  background: #fff;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;

  p {
    margin: 0;
    font-weight: 100;
    font-size: 14px;
  }

  strong {
    margin-right: 1rem;
  }
`

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorStyles key={i}>
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    ))
  }
  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  )
}

DisplayError.defaultProps = {
  error: {},
}

DisplayError.propTypes = {
  error: PropTypes.object,
}

export default DisplayError
