import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import storiesReducer from './stories'

export default combineReducers({
  routing: routerReducer,
  stories: storiesReducer,
})
