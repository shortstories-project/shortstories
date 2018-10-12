import * as React from 'react'
// import styled from 'styled-components'
import 'bulma/css/bulma.css'
import PropTypes from 'prop-types'

class Input extends React.PureComponent {
  state = {
    notEdit: true,
  }

  edit = () => {
    // console.log(123)
  }

  render() {
    return (
      <div>
        <input
          value={this.props.valueUser}
          onChange={this.edit}
          readOnly={this.props.notEdit}
        />
      </div>
    )
  }
}

Input.propTypes = {
  valueUser: PropTypes.string,
  notEdit: PropTypes.any,
}

export default Input
