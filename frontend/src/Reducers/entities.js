// @flow
import merge from 'lodash/merge'

const initialState: { users: Object, stories: Object } = { users: {}, stories: {} }

const entities = (state: Object = initialState, action: Object) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
}

export default entities
