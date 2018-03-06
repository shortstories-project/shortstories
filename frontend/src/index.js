import React from 'react'
import { render } from 'react-dom'
import { injectGlobal } from 'styled-components'
import globalStyles from './global-styles'
import App from './components'
import configureStore, { history } from './store'
import registerServiceWorker from './register-service-worker'

injectGlobal`${globalStyles}` // eslint-disable-line

const store = configureStore()

const mountNode = document.getElementById('root')

render(<App history={history} store={store} />, mountNode) // eslint-disable-line

if (module.hot) {
  module.hot.accept()
}

registerServiceWorker()
