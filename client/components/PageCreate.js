import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Stickers from './Stickers'
import {sticker} from '../store'

class PageCreate extends React.Component {
  constructor() {
    super()
    this.state = {}

    this.allowDrop = this.allowDrop.bind(this)
    this.drop = this.drop.bind(this)
    this.mouseTracker = this.mouseTracker.bind(this)
    this.savePage=this.savePage.bind(this)
  }

  allowDrop(e) {
    e.preventDefault()
  }

  drop(e) {
    ///stickers currently shift slightly to the bottom right on drop and while our dropzone div prevents stickers from jutting out past the top and left boundaries it does not do so for the bottom and right...??
    const id = this.props.stickerId

    //Document Relative: (mouse coords on Drop) - rounded to match save coords
    const [mouseX, mouseY] = [Math.round(e.pageX),Math.round(e.pageY)]
    console.log("drop event page x,y:", mouseX, mouseY)

    //Placing sticker at mouse drop coordinates
    const itm = document.getElementById(id)

    const stickerPlacement = (X, Y) => {
        const clone = itm.cloneNode(true)
        clone.style.position = "absolute"
        clone.style.top = `${Y}px`
        clone.style.left = `${X}px`
        return clone
    }

    e.target.append(stickerPlacement(mouseX, mouseY))

    //drop-zone coords (top, left corner)
    const elem = document.getElementById("newPage")
    const coords = elem.getBoundingClientRect()
    const [elemX, elemY] = [coords.left + pageXOffset, coords.top + pageYOffset]

    //mouse coords relative to dropzone(gif)
    const [x, y] = [Math.round(mouseX - elemX), Math.round(mouseY - elemY)]
    this.setState({stickerId: id, stickerX: x, stickerY: y})
  }

  mouseTracker(e) {
    console.log("x:", e.pageX, 'y:', e.pageY)
  }

  savePage() {
    //everything inside the 'newPage' divId should be saved like a screenshot to storage as a single gif then gif location url from storage is saved to db with logged in user's userId
    console.log('state:', this.state)
  }

  render() {
    // page = this.props.myPage.location
    //place ${page} where hard coded url is now

    return (
      <div id="myPage">
        <span>
          <Stickers className="sidebar" />
          <div
            style={ {backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Dummy%20Images%2Fanimal-animal-photography-cat-96938.jpg?alt=media&token=81a2dd17-6b33-4ea2-976c-24ecb435cd21")`} }
            id="newPage"
            className="dropzone"
            dropzone='copy'
            onDragOver={this.allowDrop}
            onDrop={this.drop}
            onMouseOver={this.mouseTracker}
          />

        </span>

        <div>
          <Link to="/home">
            <button type="button" onClick={this.savePage}>
              SAVE
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    stickerId: state.sticker.stickerId
    //, myPage: state.page.myPage
  }
}

export default connect(mapStateToProps)(PageCreate)
