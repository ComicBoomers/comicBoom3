import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {me} from '../store'

/**
 * COMPONENT
 */
class UserHome extends Component {
// componentDidMount() {
//   this.props.loadInitialData()
// }
render(){
  const email = this.props.user.email
  console.log('My props', this.props)
  return (
    <div>
    <div>
      <h3>Welcome, {email}</h3>
      <Link to='/uploadVideo'>
      <button type ='button' >
      <img src ='https://www.inmotionnow.com/wp-content/uploads/2017/03/New-to-inMotion-Reviewer-Markup-Sharing-Options-and-Forwarding-from-Review-Interface.png' className ='addNewButton' /></button>
      </Link>
    </div>
    <div>
    <h2>My Comics</h2>
    <Link to='/comicPage'>
    <p>PLACEHOLDER</p>
    </Link>
 <img src={this.props.user.pages[0].location} className='homePageImage'/>
    <p>PLACEHOLDER</p>
    <p>PLACEHOLDER</p>
    </div>
    </div>
  )
}
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user.curUser
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(UserHome))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  user: PropTypes.object
}
