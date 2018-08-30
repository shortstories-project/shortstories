import * as React from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from '../sign-out-button'
import * as routes from '../../constants/routes'

const NavigationAuth = ({ session }: any) => (
  <ul>
    <li>
      <Link to={routes.MAIN}>Stories</Link>
    </li>
    <li>
      <Link to={routes.ACCOUNT}>Account ({session.me.username})</Link>
    </li>
    {session &&
      session.me &&
      session.me.role === 'ADMIN' && (
        <li>
          <Link to={routes.ADMIN}>Admin</Link>
        </li>
      )}
    <li>
      <SignOutButton />
    </li>
  </ul>
)

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={routes.MAIN}>Stories</Link>
    </li>
  </ul>
)

const Navigation = ({ session }: any) => (
  <div>
    {session && session.me ? (
      <NavigationAuth session={session} />
    ) : (
      <NavigationNonAuth />
    )}
  </div>
)

export default Navigation
