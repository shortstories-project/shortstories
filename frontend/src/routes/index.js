import React from 'react'
import { Route } from 'react-router-dom'
import Header from '../Components/Commons/Header'

const Routes = () => (
  <div>
    <Route path="/" component={Header} />
    {/* <Route exact path="/" component={Home} />
    <Route path="/create-story" component={CreateStory} /> */}
  </div>
)

export default Routes
