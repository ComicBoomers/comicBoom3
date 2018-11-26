import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {me} from '../store'
// import batman from '../images/batman_theme_x.wav'

/**
 * COMPONENT
 */
class UserHome extends Component {
componentDidMount() {
  this.props.loadInitialData()
}
render(){
  const email = this.props.user.email
  return (
    <div id='myPage'>
    {/* <embed src={batman}/> */}
        {this.props.user.pages &&
        <div>
    <div>
      <h3 className='pageText'>Welcome, {email}</h3>
      <Link to='/uploadVideo'>
      <button type ='button' >
      <img src ='https://banner2.kisspng.com/20180701/fss/kisspng-computer-icons-medicine-health-care-plus-button-5b38d58623cf91.1353788815304513341467.jpg' className ='addNewButton' /></button>
      </Link>
    </div>
  <div>
  <h2 className='pageText'>My Comics</h2>{
    this.props.user.pages.map(photo =>{
      return (
        <div key = {photo.id} className='myPage'>
           <Link to={{pathname: `/comicPage/${photo.id}`, state: photo.location}}>
  <img src={photo.location} className='homePageImage'/>
  </Link>
        </div>
      )
    })

  }
  </div>
  </div>
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

export default withRouter(connect(mapState, mapDispatch)(UserHome))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  user: PropTypes.object
}
