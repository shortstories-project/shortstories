import * as React from 'react'
import styled, { css } from 'styled-components'
import { defaultProps } from 'recompose'
import Loader from '../loader'

interface IProps {
  className?: string
  children: React.ReactNode
  disabled?: boolean
  type?: string
  loading?: boolean
  onClick?: (event?: React.SyntheticEvent) => void
}

const Button = defaultProps({
  disabled: false,
  type: 'button',
  children: 'Button',
  loading: false,
  onClick: () => null,
})(({ className, children, disabled, type, loading, onClick }: IProps) => (
  <button
    className={className}
    onClick={onClick}
    disabled={disabled || loading}
    type={type}
  >
    {loading ? <Loader /> : children}
  </button>
))

const StyledButton = styled(Button)`
  font-family: var(--main-font);
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  height: 40px;
  color: var(--white);
  border: none;
  cursor: pointer;
  background-color: var(--black);
  outline: none;
  transition: all 0.25s ease-out;
  ${({ disabled, loading }) =>
    disabled || loading
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

export default StyledButton
