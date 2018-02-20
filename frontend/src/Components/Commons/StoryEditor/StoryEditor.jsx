import React, { PureComponent } from 'react'
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js'
// import { stateToHTML } from 'draft-js-export-html'
import BlockStyleControls from './BlockStyleControls'
import InlineStyleControls from './InlineStyleControls'

class StoryEditor extends PureComponent {
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
    const { editorState } = this.state
    let className = 'RichEditor-editor'
    const contentState = editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        className += ' RichEditor-hidePlaceholder'
      }
    }
    return (
      <div className="RichEditor-root">
        <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType} />
        <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle} />
        <div className={className} onClick={this.focus}>
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
    )
  }
}

export default StoryEditor
