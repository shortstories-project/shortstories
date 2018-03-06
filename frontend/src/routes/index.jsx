// @flow
import * as React from 'react'
import { compose } from 'redux'
import { Route, Switch } from 'react-router-dom'
import Header from '../components/commons/header'
import Main from '../components/main'
import CreateStory from '../components/create-story'
import Profile from '../components/profile'
import withUser from '../HOC/with-user'
import withStories from '../HOC/with-stories'

const Routes = () => (
  <React.Fragment>
    <Header />
    <Switch>
      <Route exact path="/" component={compose(withUser, withStories)(Main)} />
      <Route path="/create-story" component={withUser(CreateStory)} />
      <Route path="/profile" component={withUser(Profile)} />
    </Switch>
  </React.Fragment>
)

export default Routes
