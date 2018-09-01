import * as React from 'react'
import styled from 'styled-components'

interface IProps {
  cols?: number
}

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  @media (min-width: 768px) {
    width: 750px;
  }
  @media (min-width: 992px) {
    width: 970px;
  }
  @media (min-width: 1200px) {
    width: 1170px;
  }
`

class GridContainer extends React.PureComponent<IProps> {
  protected static defaultProps = {
    cols: 12,
  }

  public render() {
    const { cols, children } = this.props
    return <Container>{children}</Container>
  }
}

export default GridContainer
