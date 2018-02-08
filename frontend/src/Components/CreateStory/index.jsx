// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Textarea from '../Commons/Textarea'
import Button from '../Commons/Button'
import Preloader from '../Commons/Preloader'

import { createStory } from '../../Actions/Commons'

import { conditionalRender } from '../../Utils'

const Wrapper = styled.main`
  margin: 0 auto;
  margin-top: 24px;
  margin-bottom: 24px;
  width: 90%;
  max-width: 600px;
`

const Count = styled.p`
  text-align: right;
`

type Props = {
  dispatch: (func: Function) => {},
  isFetching: boolean,
}

type State = {
  story: string,
}

class CreateStory extends Component<*, Props, State> {
  state = {
    story: '',
  }

  writeStory = (e: SyntheticInputEvent) => {
    this.setState({ story: e.target.value })
  }

  render() {
    const { story } = this.state
    const { isFetching, dispatch } = this.props
    return (
      <Wrapper>
        <Count>{3000 - story.length}</Count>
        <Textarea
          placeholder="Write your story here..."
          maxLength={3000}
          value={story}
          onChange={this.writeStory}
        />
        <Button
          onClick={() => {
            dispatch(createStory(story))
          }}
        >
          {conditionalRender(isFetching, <Preloader />, 'Publish your story')}
        </Button>
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ UI }) => ({
  isFetching: UI.createStoryFetching,
})

export default connect(mapStateToProps)(CreateStory)
