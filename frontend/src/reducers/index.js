import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import entities from './Entities'
import UI from './UI'

export default combineReducers({
  UI,
  entities,
  routing: routerReducer,
})
