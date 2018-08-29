import { applyMiddleware, createStore } from 'redux'
import { createBrowserHistory } from 'history'
import thunkMiddleware from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers'

const history = createBrowserHistory()

function configureStore(preloadedState?: object) {
  const reducerWithHistory = connectRouter(history)(rootReducer)
  const middlewares = [routerMiddleware(history), thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)
  const store = createStore(reducerWithHistory, preloadedState, composedEnhancers)
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(reducerWithHistory)
    })
  }
  return store
}

const configuredStore = configureStore()

export { configuredStore as store, history }
