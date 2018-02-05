import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadStories } from '../Actions/Commons'

type Props = {
  loadStories: () => {},
  stories: Array
}

export default function withStories(WrappedComponent) {
  class ComponentWithStories extends Component<Props> {
    componentDidMount() {
      this.props.loadStories()
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapDispatchToProps = dispatch => ({
    loadStories: () => dispatch(loadStories()),
  })

  const mapStateToProps = ({ entities: { stories } }) => ({
    stories: Object.values(stories),
  })

  return connect(mapStateToProps, mapDispatchToProps)(ComponentWithStories)
}
