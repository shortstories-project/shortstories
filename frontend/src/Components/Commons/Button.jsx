// @flow
import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  outline: none;
  padding: 8px;
  margin: 0;
  box-sizing: border-box;
  text-align: center;
  border: 3px solid #eee;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.25s ease;
  text-transform: uppercase;
  background-color: white;
  &:hover {
    color: white;
    background: black;
    border: 3px solid black;
  }
`

type Props = {
  children: any,
  onClick: () => void,
}

const Button = ({ children, onClick }: Props) => (
  <StyledButton onClick={onClick}>
    {children}
  </StyledButton>
)

export default Button
