import * as React from 'react'
import styled from 'styled-components'

interface IProps {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  children?: React.ReactNode
  className?: string
}

const Column: any = styled.div`
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

class GridColumn extends React.PureComponent<IProps> {
  protected static defaultProps = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
  }

  public render() {
    const { xs, sm, md, lg, children, className } = this.props
    return (
      <Column className={className} xs={xs} sm={sm} md={md} lg={lg}>
        {children}
      </Column>
    )
  }
}

export default GridColumn
