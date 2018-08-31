import history from '../constants/history'
import * as routes from '../constants/routes'

export const signOut = (client: any) => {
  localStorage.setItem('token', '')
  client.resetStore()
  history.push(routes.SIGN_IN)
}
