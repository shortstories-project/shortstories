// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Textarea from '../Commons/Textarea'
import Button from '../Commons/Button'

const Wrapper = styled.main`
  margin: 0 auto;
  width: 90%;
  max-width: 600px;
`

const Count = styled.p`
  text-align: right;
`

type State = {
  story: string,
}

class CreateStory extends Component<*, State> {
  state = {
    story: '',
  }

  render() {
    const { story } = this.state
    return (
      <Wrapper>
        <Count>{3000 - story.length}</Count>
        <Textarea
          placeholder="Write your story here..."
          maxLength={3000}
          value={story}
          onChange={e => this.setState({ story: e.target.value })}
        />
        <Button
          onClick={() => {}}
          style={{ width: '200px', marginBottom: '30px', float: 'right' }}
        >
          <p>Publish your story</p>
        </Button>
      </Wrapper>
    )
  }
}

export default connect()(CreateStory)
