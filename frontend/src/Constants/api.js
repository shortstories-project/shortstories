// @flow
export const API_URL: string = '/web_api'

export const headerJSON: Object = {
  'Content-Type': 'application/json; charset=utf-8',
}
export const withCookie: Object = {
  credentials: 'same-origin',
}

export const routes: Object = {
  profile: `${API_URL}/profile`,
  stories: `${API_URL}/stories`,
}
