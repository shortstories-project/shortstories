import React, { Fragment } from 'react'
import { compose } from 'redux'
import { Route, Switch } from 'react-router-dom'

import Header from '../Components/Commons/Header'
import Main from '../Components/Main'
import CreateStory from '../Components/CreateStory'

import WithUser from '../HOC/WithUser'
import WithStories from '../HOC/WithStories'

const Routes = () => (
  <Fragment>
    <Header />
    <Switch>
      <Route exact path="/" component={compose(WithUser, WithStories)(Main)} />
      <Route path="/create-story" component={WithUser(CreateStory)} />
    </Switch>
  </Fragment>
)

export default Routes
