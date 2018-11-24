import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Stickers from './Stickers'
import { sticker } from '../store'


class PageCreate extends React.Component {

  constructor() {
    super()
    this.allowDrop=this.allowDrop.bind(this)
    this.drop=this.drop.bind(this)
    // this.savePage=this.savePage.bind(this)
  }

  allowDrop(e) {
    e.preventDefault()
  }

  drop(e) {
    const id = this.props.stickerId
    const target = e.target
    target.append(document.getElementById(id))
  }

  // savePage() {
  //   //everything inside the 'newPage' divId should be saved like a screenshot to storage as a single image then image location url from storage is saved to db with logged in user's userId
  // }

  render() {
    return (

      <div>
        <div id='sidebar'>
          <Stickers />
        </div>
        <div id='newPage' className='dropzone' ondragover={this.allowDrop} ondrop={this.drop}>
        {
          // page (Gifs in template) img goes here
        }
        <img src='https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Dummy%20Images%2Fanimal-animal-photography-cat-96938.jpg?alt=media&token=81a2dd17-6b33-4ea2-976c-24ecb435cd21' />
        </div>
        <div>
       <Link to='/home'>
          <button type='button' onClick={this.savePage}>SAVE</button>
   </Link>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    stickerId: state.sticker.stickerId
  }
}

export default connect(mapStateToProps)(PageCreate)
