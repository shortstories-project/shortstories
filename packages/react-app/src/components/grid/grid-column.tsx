import * as React from 'react'
import styled from 'styled-components'

interface IProps {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  children?: React.ReactNode
}

const Column: any = styled.div`
  background-color: #ffffff;
  grid-column: span ${(props: IProps) => props.xs};
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

class GridColumn extends React.PureComponent<IProps> {
  protected static defaultProps = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
  }

  public render() {
    const { xs, sm, md, lg, children } = this.props
    return (
      <Column xs={xs} sm={sm} md={md} lg={lg}>
        {children}
      </Column>
    )
  }
}

export default GridColumn
