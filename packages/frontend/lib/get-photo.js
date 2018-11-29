import API_URL from '../config'

function getPhoto(url) {
  if (typeof url === 'string') return `${API_URL}${url}`
  return '/static/user-placeholder.png'
}

export default getPhoto
