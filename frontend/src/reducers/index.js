import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import entities from './Entities'

export default combineReducers({
  routing: routerReducer,
  entities,
})
