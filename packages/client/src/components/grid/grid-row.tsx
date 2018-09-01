import * as React from 'react'
import styled from 'styled-components'

interface IProps {
  center?: boolean
  innerRef?: (node: string | Element) => void
}

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 20px;
  ${(props: IProps) =>
    props.center &&
    `
    height: calc(100vh - 80px);
    align-items: center;
    justify-content: center;
  `};
`

class GridRow extends React.PureComponent<IProps> {
  public render() {
    const { children, center, innerRef } = this.props
    return (
      <Row innerRef={innerRef} center={center}>
        {children}
      </Row>
    )
  }
}

export default GridRow
