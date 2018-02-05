// @flow
import { CALL_API, Schemas } from '../Middlewares/api'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

const fetchUser = () => ({
  [CALL_API]: {
    types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
    endpoint: 'profile',
    schema: Schemas.USERS,
  },
})

export const loadUser = () => dispatch => dispatch(fetchUser())

export const STORIES_REQUEST = 'STORIES_REQUEST'
export const STORIES_SUCCESS = 'STORIES_SUCCESS'
export const STORIES_FAILURE = 'STORIES_FAILURE'

const fetchStories = () => ({
  [CALL_API]: {
    types: [STORIES_REQUEST, STORIES_SUCCESS, STORIES_FAILURE],
    endpoint: 'stories',
    schema: Schemas.STORIES,
  },
})

export const loadStories = () => dispatch => dispatch(fetchStories())
