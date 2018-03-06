// @flow
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import Button from '../commons/button'
import Preloader from '../commons/preloader'
import { BlockStyleControls, InlineStyleControls } from './story-editor-components'
import { createStory } from '../../actions'
import { conditionalRender } from '../../utils'

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

class CreateStory extends PureComponent<*, Props, *> {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onChange = (editorState) => {
    this.setState({ editorState })
  }

  getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'blockquote':
        return 'RichEditor-blockquote'
      default:
        return null
    }
  }

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(e, this.state.editorState, 4 /* maxDepth */)
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState)
      }
      return
    }
    return getDefaultKeyBinding(e)
  }

  toggleBlockType = (blockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType))
  }

  toggleInlineStyle = (inlineStyle) => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle))
  }

  render() {
    const { dispatch, isFetching } = this.props
    const { editorState } = this.state
    const content = editorState.getCurrentContent()
    const html = stateToHTML(content)
    let className = 'RichEditor-editor'
    if (!content.hasText()) {
      if (
        content
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        className += ' RichEditor-hidePlaceholder'
      }
    }
    return (
      <Wrapper>
        <div className="RichEditor-root">
          <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType} />
          <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle} />
          <div className={className}>
            <Editor
              blockStyleFn={this.getBlockStyle}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              placeholder="Tell a story..."
              spellCheck
            />
          </div>
        </div>
        <Button
          onClick={() => {
            dispatch(createStory(html))
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
