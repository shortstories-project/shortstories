import * as api from '../Constants/api'
import { fetchProfileTypes } from '../Constants/types'

export const fetchProfile = () => async (dispatch) => {
  try {
    dispatch(fetchProfileTypes.pending)
    const response = await fetch(api.routes.profile, {
      ...api.withCookie,
      method: 'get',
    })
    const body = await response.json()
    if (response.ok) {
      dispatch({
        type: fetchProfileTypes.success,
        payload: body,
      })
    } else {
      dispatch({
        type: fetchProfileTypes.failure,
        payload: body,
        error: true,
      })
    }
  } catch (err) {
    dispatch({
      type: fetchProfileTypes.failure,
      payload: err,
      error: true,
    })
  }
}

export const a = 1
