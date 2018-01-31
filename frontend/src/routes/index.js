import React from 'react'
import { Route } from 'react-router-dom'
import { Header } from '../components'
import Home from '../components/pages/Home'
import CreateStory from '../components/pages/CreateStory'

const Routes = () => (
  <div>
    <Header />
    <Route exact path="/" component={Home} />
    <Route path="/create-story" component={CreateStory} />
  </div>
)

export default Routes
