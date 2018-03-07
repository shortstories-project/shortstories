// @flow
import { normalize, schema } from 'normalizr'
import { camelizeKeys } from 'humps'
import { API_URL } from '../constants/api'

const API_ROOT = `${API_URL}/`

const callApi = (endpoint: string, schm: Object) => {
  const fullUrl = endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint
  return fetch(fullUrl, { credentials: 'same-origin' }).then(response =>
    response.json().then((json) => {
      if (!response.ok) return Promise.reject(json)
      const camelizedJson = camelizeKeys(json)
      return normalize(camelizedJson, schm)
    }))
}

const userSchema = new schema.Entity('users')
const storySchema = new schema.Entity('stories')

export const Schemas = {
  USERS: { profile: userSchema },
  STORIES: { stories: [storySchema] },
}

export const CALL_API = 'Call API'

export default (store: Object) => (next: Function) => (action: Object) => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') return next(action)

  let { endpoint } = callAPI
  const { types } = callAPI

  if (typeof endpoint === 'function') endpoint = endpoint(store.getState())

  if (typeof endpoint !== 'string') throw new Error('Specify a string endpoint URL.')
  if (!callAPI.schema) throw new Error('Specify one of the exported Schemas.')
  if (!Array.isArray(types) || types.length !== 3) throw new Error('Expected an array of three action types.')
  if (!types.every(type => typeof type === 'string')) throw new Error('Expected action types to be strings.')

  const actionWith = (data) => {
    const finalAction = {
      ...action,
      ...data,
    }
    delete finalAction[CALL_API]
    return finalAction
  }

  const [requestType, successType, failureType] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, callAPI.schema).then(
    response =>
      next(actionWith({
        response,
        type: successType,
      })),
    error =>
      next(actionWith({
        type: failureType,
        error: error.message || 'Something bad happened',
      })),
  )
}
