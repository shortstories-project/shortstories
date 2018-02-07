// @flow
import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  outline: none;
  height: 40px;
  width: 100px;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  text-align: center;
  border: 3px solid #eee;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.25s ease;
  text-transform: uppercase;
  &:hover {
    color: white;
    background: black;
    border: 2px solid black;
  }
  ${(props: Object) => ({ ...props.style })}
`

type Props = {
  children: any,
  onClick?: Function,
  extStyle?: Object,
}

const Button = ({ children, onClick, extStyle }: Props) => (
  <StyledButton
    style={extStyle}
    onClick={onClick}
  >
    {children}
  </StyledButton>
)

export default Button
