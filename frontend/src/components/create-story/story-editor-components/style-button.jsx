import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Button = styled.span`
  color: ${props => (props.active ? '#5890ff' : '#999')};
  cursor: pointer;
  margin-right: 16px;
  padding: 2px 0;
  display: inline-block;
`

type Props = {
  active: boolean,
  label: string,
  onToggle: (style: string) => {},
  style: string
}

class StyleButton extends PureComponent<Props> {
  onToggle = (e) => {
    const { onToggle, style } = this.props
    e.preventDefault()
    onToggle(style)
  }

  render() {
    const { active, label } = this.props
    return (
      <Button active={active} onMouseDown={this.onToggle}>
        {label}
      </Button>
    )
  }
}

export default StyleButton
