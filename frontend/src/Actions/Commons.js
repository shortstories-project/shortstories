// @flow
import { CALL_API, Schemas } from '../Middlewares/api'
import { API_URL } from '../Constants/api'

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

export const loadUser = () => (dispatch: Function) => dispatch(fetchUser())

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

export const loadStories = () => (dispatch: Function) => dispatch(fetchStories())

export const CREATE_STORY_REQUEST = 'CREATE_STORY_REQUEST'
export const CREATE_STORY_SUCCESS = 'CREATE_STORY_SUCCESS'
export const CREATE_STORY_FAILURE = 'CREATE_STORY_FAILURE'

export const createStory = (story: string) => async (dispatch: Function) => {
  try {
    dispatch({ type: CREATE_STORY_REQUEST })
    const url = `${API_URL}/stories`
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'same-origin',
      body: JSON.stringify({ text: story }),
    })
    const body = await response.json()
    if (response.ok) {
      dispatch({
        type: CREATE_STORY_SUCCESS,
        payload: body,
      })
    } else {
      dispatch({
        type: CREATE_STORY_FAILURE,
        error: true,
        payload: body,
      })
    }
  } catch (err) {
    dispatch({
      type: CREATE_STORY_FAILURE,
      error: true,
      payload: err,
    })
  }
}
