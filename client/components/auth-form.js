import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="loginSignUp">
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <div className="boomify"> Email</div>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <div className="boomify">Password</div>
          </label>
          <input name="password" type="password" />
        </div>
        <span>
          <button type="submit" className="boomify">
            {displayName}
          </button>{' '}
          or {''}
          {error && error.response && <div> {error.response.data} </div>}
          <a href="/auth/google">
            <button type="button" className="boomify">
              {' '}
              {displayName} with{' '}
              <img src="https://addons.thunderbird.net/user-media/addon_icons/12/12061-64.png?modified=1353884979" />
            </button>
          </a>
        </span>
      </form>
      <div />
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
