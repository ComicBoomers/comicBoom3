import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {

render(){


  const {email} = this.props

  return (
    <div>
    <div>
      <h3>Welcome, Sammi</h3>
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
    <p>PLACEHOLDER</p>
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
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
