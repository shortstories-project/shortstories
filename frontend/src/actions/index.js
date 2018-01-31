import { push } from 'react-router-redux'

import API_URL from '../config'

export const FETCH_STORIES_REQUEST = 'FETCH_STORIES_REQUEST'
export const FETCH_STORIES_SUCCESS = 'FETCH_STORIES_SUCCESS'
export const FETCH_STORIES_ERROR = 'FETCH_STORIES_FAILED'

export const CREATE_STORY_REQUEST = 'CREATE_STORY_REQUEST'
export const CREATE_STORY_SUCCESS = 'CREATE_STORY_SUCCESS'
export const CREATE_STORY_ERROR = 'CREATE_STORY_ERROR'

const headerJSON = {
  'Content-Type': 'application/json; charset=utf-8',
}

export const fetchStories = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_STORIES_REQUEST })
    const url = `${API_URL}/stories`
    const response = await fetch(url)
    const body = await response.json()
    if (response.ok) {
      dispatch({
        type: FETCH_STORIES_SUCCESS,
        payload: body,
      })
    } else {
      dispatch({
        type: FETCH_STORIES_ERROR,
        error: true,
        payload: body,
      })
    }
  } catch (e) {
    dispatch({
      type: FETCH_STORIES_ERROR,
      error: true,
      payload: e,
    })
  }
}

export const createStory = story => async (dispatch) => {
  try {
    dispatch({ type: CREATE_STORY_REQUEST })
    const url = `${API_URL}/stories`
    const response = await fetch(url, {
      method: 'post',
      headers: headerJSON,
      body: JSON.stringify({ text: story }),
    })
    const body = await response.json()
    if (response.ok) {
      dispatch({
        type: CREATE_STORY_SUCCESS,
        payload: body,
      })
      dispatch(push('/'))
    } else {
      dispatch({
        type: CREATE_STORY_ERROR,
        error: true,
        payload: body,
      })
    }
  } catch (e) {
    dispatch({
      type: CREATE_STORY_ERROR,
      error: true,
      payload: e,
    })
  }
}
