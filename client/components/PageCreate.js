import React from 'react'
import StickerBar from './StickerBar'
import {Link} from 'react-router-dom'


export default class PageCreate extends React.Component{
  render(){
    return(
      <div>
    <StickerBar/>
      {/* our sticker Navbar */}
    <h1>Our Returned Page to be stickified goes here</h1>
    <Link to='/home'>
    <button type='submit'>Save My Page</button>
    </Link>
    </div>
    )
  }
}
