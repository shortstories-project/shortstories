// @flow
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const StyledLogo = styled.h1`
  width: 230px;
  margin: 30px auto;
  cursor: pointer;
  font-family: 'Caveat', sans-serif;
  font-size: 3rem;
  text-align: center;
  text-shadow 1px 3px 0 rgba(18, 86, 136, 0.11);
`

type Props = {
  dispatch: Function,
}

const Logo = ({ dispatch }: Props) => (
  <StyledLogo onClick={() => dispatch(push('/'))}>
    Short stories
  </StyledLogo>
)

export default connect()(Logo)
