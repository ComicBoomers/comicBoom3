import React from 'react'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Stickers from './Stickers'


class PageCreate extends React.Component {

  constructor() {
    super()
    this.state = {
      id: null
    }

    this.allowDrop=this.allowDrop.bind(this)
    this.drop=this.drop.bind(this)
    this.savePage=this.savePage.bind(this)
  }

  allowDrop(e) {
    e.preventDefault()
  }

  drop(e) {
    const id = this.state.id
    const target = e.target
    target.append(document.getElementById(id))
  }

  savePage() {
    //everything inside the 'newPage' divId should be saved like a screenshot to storage as a single image then image location url from storage is saved to db with logged in user's userId
  }

  //somehow ID needs to be passed back from <Stickers>
  render() {
    return (
      <div>
        <div id='sidebar'>
          <Stickers />
        </div>
        <div id='newPage' className='dropzone' ondragover={this.allowDrop(event)} ondrop={this.drop(event)}>
        {
          // page (Gifs in template) img goes here
        }
        </div>
        <div>
       <Link to='/home'>
          <button onClick={this.savePage}>SAVE</button>
   </Link>
        </div>
      </div>
    )
  }

}

export default PageCreate
