import sanitize from 'sanitize.css'
import quillStyles from 'quill/dist/quill.core.css'
import quillThemeSnowStyles from 'quill/dist/quill.snow.css'

export default `
  @import url(${sanitize});
  @import url(${quillStyles});
  @import url(${quillThemeSnowStyles});

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

  /* Quill editor style */
  #editor {
    font-family: 'PT Sans', sans-serif;
    font-size: 1.5rem;
  }
  .ql-toolbar.ql-snow {
    border: 3px solid #eee;
    background-color: white;
    box-sizing: border-box;
    padding: 8px;
    font-family: 'PT Sans';
  }
  .ql-container.ql-snow {
    border: 3px solid #eee;
    background-color: white;
    margin-bottom: 8px;
    min-height: 660px;
  }
  /* PT Sans */
  .ql-snow .ql-picker.ql-font .ql-picker-label::before, .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: 'PT Sans';
    font-family: 'PT Sans', sans-serif;
  }
  .ql-font-pt-sans {
    font-family: 'PT Sans', sans-serif;
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=pt-sans]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=pt-sans]::before {
      content: 'PT Sans';
      font-family: 'PT Sans', sans-serif;
  }
  /* Roboto */
  .ql-font-roboto {
    font-family: 'Roboto', sans-serif;
    font-size: 1.5rem;
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=roboto]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=roboto]::before {
    content: 'Roboto';
    font-family: 'Roboto', sans-serif;
  }
  /* Montserrat */
  .ql-font-montserrat {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5rem;
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=montserrat]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=montserrat]::before {
    content: 'Montserrat';
    font-family: 'Montserrat', sans-serif;
  }
  /* Noto Sans */
  .ql-font-noto-sans {
    font-family: 'Noto Sans', sans-serif;
    font-size: 1.5rem;
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=noto-sans]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=noto-sans]::before {
    content: 'Noto Sans';
    font-family: 'Noto Sans', sans-serif;
  }
  /* Amatic SC */
  .ql-font-amatic-sc {
    font-family: 'Amatic SC', cursive;
    font-size: 1.5rem;
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=amatic-sc]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=amatic-sc]::before {
    content: 'Amatic SC';
    font-family: 'Amatic SC', cursive;
  }
  /* Marck Script */
  .ql-font-marck-script {
    font-family: 'Marck Script', cursive;
    font-size: 1.5rem;
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=marck-script]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=marck-script]::before {
    content: 'Marck Script';
    font-family: 'Marck Script', cursive;
  }
`
