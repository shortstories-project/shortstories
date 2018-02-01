import React from 'react'
import { render } from 'react-dom'
import { injectGlobal } from 'styled-components'
import globalStyles from './globalStyles'
import Root from './Root'
import configureStore, { history } from './Store'
import registerServiceWorker from './registerServiceWorker'

injectGlobal`${globalStyles}` // eslint-disable-line

const store = configureStore()

const mountNode = document.getElementById('root')

render(<Root history={history} store={store} />, mountNode)

if (module.hot) {
  module.hot.accept()
}

registerServiceWorker()
