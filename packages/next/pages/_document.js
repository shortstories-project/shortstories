// import Document, { Head, Main, NextScript } from 'next/document'
// import { ServerStyleSheet } from 'styled-components'

// class MyDocument extends Document {
//   static getInitialProps({ renderPage }) {
//     const sheet = new ServerStyleSheet()
//     const page = renderPage(App => props =>
//       sheet.collectStyles(<App {...props} />)
//     )
//     const styleTags = sheet.getStyleElement()
//     return { ...page, styleTags }
//   }

//   render() {
//     return (
//       <html lang="en">
//         <Head>{this.props.styleTags}</Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </html>
//     )
//   }
// }

// export default MyDocument

import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()

    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: [...initialProps.styles, ...sheet.getStyleElement()],
    }
  }
}
