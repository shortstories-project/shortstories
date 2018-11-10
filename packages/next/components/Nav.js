import Link from 'next/link'
import User from './User'
import Signout from './Signout'
import NavStyles from './styles/NavStyles'

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles data-test="nav">
        {me && (
          <>
            <Link href="/create-story">
              <a>Create story</a>
            </Link>
            <Link href="/me">
              <a>Account</a>
            </Link>
            <Signout />
          </>
        )}
        {!me && (
          <>
            <Link href="/signin">
              <a>Sign In</a>
            </Link>
            <Link href="/signup">
              <a>Sign Up</a>
            </Link>
          </>
        )}
      </NavStyles>
    )}
  </User>
)

export default Nav
