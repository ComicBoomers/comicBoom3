import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="navbar">
    <h1 className="left">ComicBOOM</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/" className="speak">
            <img
              src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-4/256/home-icon.png"
              width="30px"
            />
          </Link>
          <a href="#" onClick={handleClick}>
            <img
              src="http://www.iconarchive.com/download/i89546/alecive/flatwoken/Apps-Dialog-Logout.ico"
              width="30px"
            />
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <button type="button" className="boomify">
            <Link to="/login">Login</Link>
          </button>
          <button type="button" className="boomify">
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
