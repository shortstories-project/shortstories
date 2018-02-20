// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Button from '../Commons/Button'
import Preloader from '../Commons/Preloader'
import StoryEditor from '../Commons/StoryEditor/StoryEditor'
import { createStory } from '../../Actions/Commons'
import { conditionalRender } from '../../Utils'

const Wrapper = styled.main`
  margin: 0 auto;
  margin-top: 24px;
  margin-bottom: 24px;
  width: 90%;
  min-width: 640px;
`

type Props = {
  dispatch: (func: Function) => {},
  isFetching: boolean,
}

class CreateStory extends Component<any, Props, any> {
  componentDidMount() {
  }

  render() {
    const { isFetching, dispatch } = this.props
    return (
      <Wrapper>
        <StoryEditor />
        <Button
          onClick={() => {
            console.log()
            // dispatch()
          }}
        >
          {conditionalRender(isFetching, <Preloader />, 'Publish your story')}
        </Button>
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ UI }: Object) => ({
  isFetching: UI.createStoryFetching,
})

export default connect(mapStateToProps)(CreateStory)
