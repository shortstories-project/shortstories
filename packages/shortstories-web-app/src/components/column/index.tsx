import * as React from 'react'
import styled from 'styled-components'
import { defaultProps } from 'recompose'

interface IProps {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  children?: React.ReactChildren
  className?: string
}

const StyledColumn = styled.div`
  grid-column: span ${(props: IProps) => props.xs};
  grid-auto-rows: auto;
  @media (min-width: 768px) {
    grid-column: span ${(props: IProps) => props.sm};
  }
  @media (min-width: 992px) {
    grid-column: span ${(props: IProps) => props.md};
  }
  @media (min-width: 1200px) {
    grid-column: span ${(props: IProps) => props.lg};
  }
`

const DEFAULT_COLUMNS = '12'

const Column = defaultProps({
  xs: DEFAULT_COLUMNS,
  sm: DEFAULT_COLUMNS,
  md: DEFAULT_COLUMNS,
  lg: DEFAULT_COLUMNS,
  className: '',
})((props: IProps) => <StyledColumn {...props}>{props.children}</StyledColumn>)

export default Column
