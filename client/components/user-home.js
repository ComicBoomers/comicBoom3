import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {me} from '../store'
import Loading from './Loading'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const email = this.props.user.email

    return (
      <div id="myPage">
        <h3 className="pageText">Welcome, {email}</h3>
        {this.props.user.pages ? (
          <div>
            <div>
              <p className="instructions">
                Click the button below to take a video and turn it into an
                animated comicBOOM.
              </p>
            </div>
            <div>
              <Link to="/uploadVideo">
                <button type="button" className="boomify">
                  🎥 ADD A COMIC BOOM 🎥
                </button>
              </Link>
              <h2 className="pageText">My Comics</h2>
            </div>

            <div className="box-content">
              {this.props.user.pages.map(photo => {
                return (
                  <div key={photo.id}>
                    <Link
                      to={{
                        pathname: `/comicPage/${photo.id}`,
                        state: photo.location
                      }}
                    >
                      <img src={photo.location} className="homePageImage" />
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <Loading />
        )}
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
