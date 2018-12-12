import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Loader from './Loader'

const StyledButton = styled.button`
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  height: 40px;
  color: ${props => props.theme.white};
  border: none;
  cursor: pointer;
  background-color: ${props => props.theme.black};
  outline: none;
  transition: all 0.25s ease-out;
  opacity: ${props => (props.disabled || props.loading ? '0.7' : '1')};
  pointer-events: ${props =>
    props.disabled || props.loading ? 'none' : 'auto'};
  &:hover {
    background-color: ${props => props.theme.purpleDark};
  }
  &:active {
    transform: scale(0.95);
  }
`

const Button = ({
  className,
  children,
  disabled,
  type,
  loading,
  onClick,
  style = {},
}) => (
  <StyledButton
    className={className}
    onClick={onClick}
    disabled={disabled || loading}
    loading={loading}
    type={type}
    style={{ ...style }}
  >
    {loading ? <Loader /> : children}
  </StyledButton>
)

Button.defaultProps = {
  className: '',
  disabled: false,
  type: 'button',
  loading: false,
  onClick: Function.prototype,
}

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
}

export default Button
