import * as React from 'react'
import styled, { css } from 'styled-components'
import { defaultProps } from 'recompose'
import Loader from '../loader'

interface IProps {
  children: React.ReactNode
  disabled?: boolean
  type?: string
  loading?: boolean
  onClick?: (event: React.SyntheticEvent) => void
}

const StyledButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  height: 40px;
  color: #ffffff;
  border: none;
  cursor: pointer;
  background-color: black;
  outline: none;
  transition: all 0.25s ease-out;
  ${({ disabled }) =>
    disabled
      ? css`
          pointer-events: none;
        `
      : null};
  &:hover {
    background-color: var(--purple);
  }
  &:active {
    transform: scale(0.95);
  }
`

const Button = defaultProps({
  disabled: false,
  type: 'button',
  children: 'Button',
  loading: false,
})(({ children, disabled, type, loading, onClick }: IProps) => (
  <StyledButton onClick={onClick} disabled={disabled || loading} type={type}>
    {loading ? <Loader /> : children}
  </StyledButton>
))

export default Button
