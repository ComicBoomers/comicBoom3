import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {me} from '../store'
import Loading from './Loading'
// import batman from '../images/batman_theme_x.wav'

/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const email = this.props.user.email

    return (

      <div>
        <h3>Welcome, {email}</h3>
          {
            this.props.user.pages ?

            <div >
              <div>
                <Link to='/uploadVideo'>
                <button type ='button' >
                {/* <img src ='https://banner2.kisspng.com/20180701/fss/kisspng-computer-icons-medicine-health-care-plus-button-5b38d58623cf91.1353788815304513341467.jpg' className ='addNewButton' /> */}
                Add New
                </button>
                </Link>
                <h2>My Comics</h2>
              </div>

              <div>
                {
                  this.props.user.pages.map(photo =>
                    {
                    return (
                      <div key = {photo.id}>
                        <Link to={{pathname: `/comicPage/${photo.id}`, state: photo.location}}>
                        <img src={photo.location}/>
                        </Link>
                      </div>)
                    })
                }
              </div>
            </div>
            :
            <Loading />
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
