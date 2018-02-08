// @flow
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import apiMiddleware from '../Middlewares/api'
import rootReducer from '../Reducers'

export const history = createHistory()

const middlewares: Array<Function> = [
  thunk,
  apiMiddleware,
  routerMiddleware(history),
  logger,
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
