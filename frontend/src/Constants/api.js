export const API_URL = '/web_api'

export const headerJSON = {
  'Content-Type': 'application/json; charset=utf-8',
}
export const withCookie = {
  credentials: 'same-origin',
}

export const routes = {
  profile: `${API_URL}/profile`,
  stories: `${API_URL}/stories`,
}
