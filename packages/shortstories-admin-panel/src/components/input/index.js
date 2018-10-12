import * as React from 'react'
// import styled from 'styled-components'
import 'bulma/css/bulma.css'
import PropTypes from 'prop-types'

class Input extends React.PureComponent {

  // state = {
  //   notEdit: true,
  // }

  openEdit = () => {
    // console.log(123)
  }

  // closeEdit = () => {
  //   this.setState({
  //     notEdit: true,
  //   })
  // }

  render() {
    return (
      <div>
        <input
          value={this.props.valueUser}
          onChange={this.openEdit}
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
