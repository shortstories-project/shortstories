import * as React from 'react'
import styled from 'styled-components'
import 'bulma/css/bulma.css'
import PropTypes from 'prop-types'

import './input.css'

const Input = styled.input`
    width: 62%;
    border: none;
    background: #00d1b2;
    color: #ffff;
    font-weight: 200;
    font-size: 16px;
    outline: none;
`

class InputComponent extends React.PureComponent {

  state = {
    myValue: this.props.valueUser
  }

  openEdit = (event) => {
    this.setState({
      myValue: event.target.value
    })
  }

  render() {
    return (
        <Input
          className={this.props.showEdit ? 'notEdit' : 'edit'}
          value={this.props.valueUser}
          // value={this.state.myValue}
          onChange={this.openEdit}
          readOnly={this.props.showEdit}
        />
    )
  }
}

InputComponent.propTypes = {
  valueUser: PropTypes.string,
  showEdit: PropTypes.any,
}

export default InputComponent
