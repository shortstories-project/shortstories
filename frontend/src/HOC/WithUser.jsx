import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadUser } from '../Actions/Commons'

type Props = {
  loadUser: () => {}
}

export default function withUser(WrappedComponent) {
  class ComponentWithUser extends Component<Props> {
    componentDidMount() {
      this.props.loadUser()
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapDispatchToProps = dispatch => ({
    loadUser: () => dispatch(loadUser()),
  })

  return connect(null, mapDispatchToProps)(ComponentWithUser)
}
