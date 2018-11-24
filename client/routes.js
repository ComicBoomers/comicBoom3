import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup} from './components'
import {me} from './store'
//Import Main Components Here
import Navbar from './components/Navbar'
import  UserHome  from './components/user-home'
import AddVideo from './components/AddVideo'
import PageCreate from './components/PageCreate'
import SelectClips from './components/SelectClips'
import SinglePage from './components/SinglePage';
import LandingPage from './components/LandingPage';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
console.log('logged in props', this.props)
    return (

      <div>
        <Navbar />

        {/* Routes placed here are available to all visitors */}
        <Route path="/landingpage" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* <Route path="/confirmation" component={Confirmation} /> */}

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/uploadVideo" component={AddVideo} />
            <Route exact path="/createComic" component={PageCreate} />
            <Route exact path='/selectClips' component={SelectClips}/>
            <Route exact path='/comicPage/:pageId'
            component = {SinglePage}/>
            {/* BELOW NEED TO BE AVAIL ADMIN ONLY... */}

          </Switch>
        )}
{
  // !isLoggedIn &&(
  //   <Route path="/landingpage" component={LandingPage} />
  // )
}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
