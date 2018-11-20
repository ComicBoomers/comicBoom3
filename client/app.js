import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {Switch, Route, Redirect} from 'react-router-dom'
import LandingPage from './components/LandingPage'

const App = () => {
  return (
    <Switch>
          <Redirect exact path='/' to='/landingPage' />
          <Route exact path ='/landingPage' component={LandingPage} />
          <Route component={Routes} />
    </Switch>
)
}

export default App
