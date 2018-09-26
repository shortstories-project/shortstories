import * as React from 'react'
import styled, { css } from 'styled-components'
import { defaultProps } from 'recompose'

interface IProps {
  center?: boolean
  children?: React.ReactChildren
}

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 20px;
  ${(props: IProps) =>
    props.center &&
    css`
      height: calc(100vh - 80px);
      align-items: center;
      justify-content: center;
    `};
`

const Row = defaultProps({
  center: false,
})(({ center, children }: IProps) => (
  <StyledRow center={center}>{children}</StyledRow>
))

export default Row
