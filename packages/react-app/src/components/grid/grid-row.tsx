import * as React from 'react'
import styled from 'styled-components'

interface IProps {
  center?: boolean
}

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 20px;
  ${(props: IProps) =>
    props.center &&
    `
    height: 100vh;
    align-items: center;
    justify-content: center;
  `};
`

class GridRow extends React.PureComponent<IProps> {
  public render() {
    const { children, center } = this.props
    return <Row center={center}>{children}</Row>
  }
}

export default GridRow
