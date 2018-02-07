import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadUser } from '../Actions/Commons'

type Props = {
  loadUser: Function,
  users: Array,
}

export default function withUser(WrappedComponent) {
  class ComponentWithUser extends Component<Props> {
    componentDidMount() {
      const { users } = this.props
      if (!users.length) this.props.loadUser()
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapDispatchToProps = dispatch => ({
    loadUser: () => dispatch(loadUser()),
  })

  const mapStateToProps = ({ entities: { users } }) => ({
    users: Object.values(users),
  })

  return connect(mapStateToProps, mapDispatchToProps)(ComponentWithUser)
}
