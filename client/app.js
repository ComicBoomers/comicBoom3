import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {Switch, Route, Redirect} from 'react-router-dom'

const App = () => {
  return (
    <Switch>
      <Route component={Routes} />
    </Switch>
  )
}

export default App
