import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

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
