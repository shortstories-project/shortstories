// @flow
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import rootReducer from '../reducers'

export const history = createHistory()

const middlewares = [
  logger,
  thunk,
  routerMiddleware(history),
]

const configureStore = (initialState?: Object) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
  )
  return store
}

export default configureStore
