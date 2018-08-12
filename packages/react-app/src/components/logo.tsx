import * as React from 'react'
import styled from 'styled-components'

interface IProps {
  full?: boolean
}

const StyledLogo = styled.p`
  text-decoration: none;
  color: black;
  cursor: ${(props: IProps) => (props.full ? 'pointer' : 'default')};
  font-family: 'Caveat', sans-serif;
  font-size: 2rem;
  text-align: center;
  text-shadow: 1px 3px 0 rgba(18, 86, 136, 0.11);
  margin: 0;
`

class Logo extends React.PureComponent<IProps> {
  protected static defaultProps = {
    full: true,
  }

  public render() {
    const { full } = this.props
    const text = full ? 'Short Stories' : 'S'
    return <StyledLogo>{text}</StyledLogo>
  }
}

export default Logo
