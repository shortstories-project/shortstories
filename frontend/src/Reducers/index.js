import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import entities from './entities'
import UI from './UI'

export default combineReducers({
  routing: routerReducer,
  UI,
  entities,
})
