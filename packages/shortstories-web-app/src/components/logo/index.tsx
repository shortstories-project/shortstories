import * as React from 'react'
import styled, { css } from 'styled-components'
import { compose, defaultProps, mapProps } from 'recompose'

interface IDefaultProps {
  full?: boolean
  black?: boolean
}

interface IMappedProps {
  text?: string
  black?: boolean
}

const StyledLogo = styled.p`
  user-select: none;
  text-decoration: none;
  color: azure;
  text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.8);
  font-family: 'Pacifico', cursive;
  font-size: var(--logo-font-size);
  letter-spacing: -1.5px;
  text-align: center;
  margin: 0;
  ${({ black }: IMappedProps) =>
    black &&
    css`
      color: var(--black);
      text-shadow: 3px 3px 0 rgba(200, 200, 200, 0.5);
    `};
`

const Logo = (props: IMappedProps) => (
  <StyledLogo black={props.black}>{props.text}</StyledLogo>
)

export default compose<IMappedProps, IDefaultProps>(
  defaultProps<IDefaultProps>({
    full: true,
    black: false,
  }),
  mapProps<IMappedProps, IDefaultProps>(props => ({
    text: props.full ? 'Shortstories' : 'S',
    black: props.black,
  }))
)(Logo)
