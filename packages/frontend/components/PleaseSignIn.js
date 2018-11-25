import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import PropTypes from 'prop-types'
import { CURRENT_USER_QUERY } from './User'
import Signin from './Signin'

const PleaseSignInStyles = styled.div`
  max-width: 380px;
  margin: 0 auto;

  p {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 1.6rem;
  }
`

function PleaseSignIn(props) {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
        if (loading) return <p>Loading...</p>
        if (!data.me) {
          return (
            <PleaseSignInStyles>
              <p>Please Sign In before Continuing</p>
              <Signin />
            </PleaseSignInStyles>
          )
        }
        return props.children
      }}
    </Query>
  )
}

PleaseSignIn.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PleaseSignIn
