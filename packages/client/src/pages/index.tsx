import * as React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'
import withSession from '../higher-order-components/with-session'
import Main from './main'
import SignUp from './sign-up'
import SignIn from './sign-in'
import Navigation from '../components/navigation'
import CreateStory from './create-story'
import NotFound from './not-found'
import history from '../constants/history'
import * as routes from '../constants/routes'

const Router = ({ session, refetch }: any) => (
  <ConnectedRouter history={history}>
    <div>
      <Navigation session={session} />
      <hr />
      <Switch>
        <Route exact path={routes.MAIN} component={Main} />
        <Route
          exact
          path={routes.SIGN_UP}
          render={() => <SignUp refetch={refetch} />}
        />
        <Route
          exact
          path={routes.SIGN_IN}
          render={() => <SignIn refetch={refetch} />}
        />
        <Route path={routes.CREATE_STORY} component={CreateStory} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </ConnectedRouter>
)

export default withSession(Router)
