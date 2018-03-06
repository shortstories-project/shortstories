import React from 'react'
import StyleButton from './style-button'

const INLINE_STYLES: { label: string, style: string }[] = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
]

type Props = {
  editorState: Object,
  onToggle: Function
}

const InlineStyleControls = ({ editorState, onToggle }: Props) => {
  const currentStyle = editorState.getCurrentInlineStyle()
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type: { label: string, style: string }) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  )
}

export { InlineStyleControls }
