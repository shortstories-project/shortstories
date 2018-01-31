import * as types from '../actions'

const INITIAL_STATE = {
  stories: [],
  isFetching: false,
  error: undefined,
}

export default function storiesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_STORIES_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case types.FETCH_STORIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        stories: action.payload.stories,
        error: undefined,
      }
    case types.FETCH_STORIES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      }
    default:
      return state
  }
}
