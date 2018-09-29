import * as React from 'react'
import styled from 'styled-components'
import { Logo } from 'components'

const StyledHeader = styled.header`
  position: sticky;
  will-change: transform;
  top: 0;
  background: transparent;
  z-index: 999999;
  box-shadow: 0 0.0625em 0.5em rgba(0, 0, 0, 0.3);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Header = () => (
  <StyledHeader>
    <Logo />
  </StyledHeader>
)

export default Header
