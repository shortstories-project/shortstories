// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadUser } from '../actions'

type StateToPropsTypes = {
  entities: {
    users: Object,
  },
}

type Props = {
  loadUser: Function,
  users: Object[],
}

export default function withUser(WrappedComponent: Class<React$Component<*, *, *>>) {
  class ComponentWithUser extends Component<any, Props, any> {
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

  const mapStateToProps = ({ entities: { users } }: StateToPropsTypes) => ({
    users: Object.values(users),
  })

  return connect(mapStateToProps, mapDispatchToProps)(ComponentWithUser)
}
