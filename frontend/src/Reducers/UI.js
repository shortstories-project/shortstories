import omit from 'lodash/omit'

const lowerCaseHelper = (str: string, replace: string) => str.toLowerCase().replace(replace, '')

const camelCaseHelper = (str: string) => {
  const arr = str.split('_')
  const filteredArr = arr
    .filter((i, index) => index !== 0)
    .map(i => i.replace(/\b\w/g, l => l.toUpperCase()))
  return `${arr[0]}${filteredArr.join()}`
}

const UI = (state = {}, action) => {
  if (action.type.includes('REQUEST')) {
    const lowerCaseType = lowerCaseHelper(action.type, '_request')
    const camelCaseType = camelCaseHelper(lowerCaseType)
    return {
      ...state,
      [`${camelCaseType}Fetching`]: true,
    }
  } else if (action.type.includes('SUCCESS')) {
    const lowerCaseType = lowerCaseHelper(action.type, '_success')
    const camelCaseType = camelCaseHelper(lowerCaseType)
    return omit(state, `${camelCaseType}Fetching`)
  }
  return state
}

export default UI
