import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {Switch, Route, Redirect} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const App = () => {
  return (
    <MuiThemeProvider>
    <Switch>
      <Route component={Routes} />
    </Switch>
    </MuiThemeProvider>
  )
}

export default App
