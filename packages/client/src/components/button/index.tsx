import * as React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  height: 40px;
  color: #ffffff;
  border: none;
  cursor: pointer;
  background-color: black;
  outline: none;
  transition: all 0.25s ease-out;
  &:hover {
    background-color: var(--purple);
  }
  &:active {
    transform: scale(0.95);
  }
`

class Button extends React.PureComponent<any> {
  public render() {
    const { title, type } = this.props
    return <StyledButton type={type}>{title}</StyledButton>
  }
}

export default Button
