import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
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

function PleaseSignIn({ isAuth, children }) {
  if (!isAuth) {
    return (
      <PleaseSignInStyles>
        <p>Please Sign In before Continuing</p>
        <Signin />
      </PleaseSignInStyles>
    )
  }
  return children
}

PleaseSignIn.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

export default PleaseSignIn
