import sanitize from 'sanitize.css'
import draft from 'draft-js/dist/Draft.css'

export default `
  @import url(${sanitize});
  @import url(${draft});

  :root {
    font-size: 16px;
  }

  body {
    background-color: #fffaea;
    font-family: 'PT Sans';
  }

  .AuthModal {
    position: absolute;
    top: 200px;
    left: 40%;
    right: 40%;
    bottom: 200px;
    border: 1px solid rgb(204, 204, 204);
    background: rgb(255, 255, 255);
    overflow: auto;
    border-radius: 4px;
    outline: none;
    padding: 20px;
    height: 140px;
    min-width: 350px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .OverlayAuthModal {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.6);
  }
  
  .RichEditor-root {
    background: #fff;
    border: 3px solid #eee;
    font-family: 'PT Sans';
    font-size: 1rem;
    padding: 16px;
    margin-bottom: 16px;
  }
  
  .RichEditor-editor {
    border-top: 3px solid #eee;
    cursor: text;
    font-size: 16px;
    margin-top: 10px;
  }
  
  .RichEditor-editor .public-DraftEditorPlaceholder-root,
  .RichEditor-editor .public-DraftEditor-content {
    margin: 0 -16px -16px;
    padding: 16px;
  }
  
  .RichEditor-editor .public-DraftEditor-content {
    min-height: 60vh;
  }
  
  .RichEditor-hidePlaceholder .public-DraftEditorPlaceholder-root {
    display: none;
  }
  
  .RichEditor-editor .RichEditor-blockquote {
    border-left: 5px solid #eee;
    color: #666;
    font-family: 'Hoefler Text', 'Georgia', serif;
    font-style: italic;
    margin: 16px 0;
    padding: 16px 32px;
  }
  
  .RichEditor-editor .public-DraftStyleDefault-pre {
    background-color: rgba(0, 0, 0, 0.05);
    font-family: 'Inconsolata', 'Menlo', 'Consolas', monospace;
    font-size: 16px;
    padding: 32px;
  }
  
  .RichEditor-controls {
    font-family: 'PT Sans';
    font-size: 0.8rem;
    margin-bottom: 8px;
    user-select: none;
  }
`
