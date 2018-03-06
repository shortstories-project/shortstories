// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadStories } from '../actions'

type StateToPropsTypes = {
  entities: {
    stories: Object,
  },
}

type Props = {
  loadStories: () => {},
  stories: Object[],
}

export default function withStories(WrappedComponent: Class<React$Component<*, *, *>>) {
  class ComponentWithStories extends Component<any, Props, any> {
    componentDidMount() {
      if (!this.props.stories.length) this.props.loadStories()
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapDispatchToProps = (dispatch: (func: Function) => {}) => ({
    loadStories: () => dispatch(loadStories()),
  })

  const mapStateToProps = ({ entities: { stories } }: StateToPropsTypes) => ({
    stories: Object.values(stories),
  })

  return connect(mapStateToProps, mapDispatchToProps)(ComponentWithStories)
}
