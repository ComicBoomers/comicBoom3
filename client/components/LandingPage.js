import React from 'react'
import { NavLink } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div id='landingPage' >
    <p>COMIC BOOM LOGO HERE</p>
      <div id='landingLink'>
      <button align='center' id='landingLink'><NavLink id='landingLink' to='/login' >Login</NavLink></button>
      <button align='center' id='landingLink'><NavLink id='landingLink' to='/signup' >Sign Up</NavLink></button>

      </div>
      </div>
  )
}

export default LandingPage
