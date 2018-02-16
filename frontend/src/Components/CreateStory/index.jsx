// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Quill from 'quill'

import Button from '../Commons/Button'
import Preloader from '../Commons/Preloader'

import { createStory } from '../../Actions/Commons'

import { conditionalRender } from '../../Utils'

const Wrapper = styled.main`
  margin: 0 auto;
  margin-top: 24px;
  margin-bottom: 24px;
  width: 90%;
  min-width: 640px;
`

const Count = styled.p`
  text-align: right;
`

type Props = {
  dispatch: (func: Function) => {},
  isFetching: boolean
}

type State = {
  story: string
}

class CreateStory extends Component<any, Props, State> {
  quill;
  state = {
    story: ''
  }

  componentDidMount() {
    const fonts = ['pt-sans', 'roboto', 'montserrat', 'noto-sans', 'marck-script', 'amatic-sc']
    const Font = Quill.import('formats/font')
    Font.whitelist = fonts
    Quill.register(Font, true)
    this.quill = new Quill('#editor', {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          [{ font: fonts }]
        ]
      },
      placeholder: 'Where is my mind...',
      theme: 'snow'
    })
    this.quill.format('font', 'pt-sans')
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
        <div id="editor" />
        <Button
          onClick={() => {
            dispatch(createStory(this.quill.container.firstChild.innerHTML))
          }}
        >
          {conditionalRender(isFetching, <Preloader />, 'Publish your story')}
        </Button>
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ UI }: Object) => ({
  isFetching: UI.createStoryFetching
})

export default connect(mapStateToProps)(CreateStory)
