import * as React from 'react'
import styled from 'styled-components'
import { compose, defaultProps, mapProps } from 'recompose'

interface IDefaultProps {
  full?: boolean
}

interface IMappedProps {
  text?: string
}

const StyledLogo = styled.p`
  text-decoration: none;
  color: azure;
  text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.8);
  font-family: 'Pacifico', cursive;
  font-size: var(--logo-font-size);
  letter-spacing: -1.5px;
  text-align: center;
  margin: 0;
`

const Logo = (props: IMappedProps) => <StyledLogo>{props.text}</StyledLogo>

export default compose<IMappedProps, IDefaultProps>(
  defaultProps<IDefaultProps>({
    full: true,
  }),
  mapProps<IMappedProps, IDefaultProps>(props => ({
    text: props.full ? 'Shortstories' : 'S',
  }))
)(Logo)
