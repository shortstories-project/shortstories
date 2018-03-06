// @flow
import omit from 'lodash/omit'
import * as types from '../actions'

const lowerCaseHelper = (str: string, replace: string): string =>
  str.toLowerCase().replace(replace, '')

const camelCaseHelper = (str: string): string => {
  const arr = str.split('_')
  const filteredArr = arr
    .filter((i, index) => index !== 0)
    .map(i => i.replace(/\b\w/g, l => l.toUpperCase()))
  return `${arr[0]}${filteredArr.join()}`
}

const UI = (state: Object = { isShowModal: false }, action: Object): Object => {
  const requestType = action.type.includes('REQUEST')
  const successType = action.type.includes('SUCCESS')
  const failureType = action.type.includes('FAILURE')
  if (requestType) {
    const lowerCaseType = lowerCaseHelper(action.type, '_request')
    const camelCaseType = camelCaseHelper(lowerCaseType)
    return {
      ...state,
      [`${camelCaseType}Fetching`]: true,
    }
  } else if (successType || failureType) {
    let lowerCaseType: string = ''
    if (successType) lowerCaseType = lowerCaseHelper(action.type, '_success')
    if (failureType) lowerCaseType = lowerCaseHelper(action.type, '_failure')
    const camelCaseType: string = camelCaseHelper(lowerCaseType)
    return omit(state, `${camelCaseType}Fetching`)
  } else if (action.type === types.SHOW_AUTH_MODAL || action.type === types.HIDE_AUTH_MODAL) {
    return {
      ...state,
      isShowModal: action.payload,
    }
  }
  return state
}

export default UI
