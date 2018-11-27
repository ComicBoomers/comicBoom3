import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Stickers from './Stickers'
import {sticker} from '../store'
import axios from 'axios'

class PageCreate extends React.Component {
  constructor() {
    super()
    this.state = {}

    this.allowDrop = this.allowDrop.bind(this)
    this.drop = this.drop.bind(this)
    // this.mouseTracker = this.mouseTracker.bind(this)
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
    const inHouseId = Number(id) + 1
    const [x, y] = [Math.round(mouseX - elemX), Math.round(mouseY - elemY)]
    this.setState({stickerId: `${inHouseId}`, stickerX: x, stickerY: y})

  }

  // mouseTracker(e) {
  //   console.log("x:", e.pageX, 'y:', e.pageY)
  // }

  async savePage() {
  // for now will only merge 1 sticker to gif and save gif (gif saved via backend so upon response it will be in the database)
    console.log(this.state)
    const objToMerge = this.state
    console.log('state:', objToMerge)
    const res = await axios.put('/api/upload', objToMerge)
    console.log("savePage merge sticker via python res:",res)
    // history.push('/')

  }

  render() {
    const userId = this.props.user.id
    const pageURL = `tmp/gifs/${userId}` //will this point to our gif?
    //we need the user ID
    //page is going to be coming from temp/gifs/ not state...how to call that up ?/?
    console.log(pageURL)
    //place ${page} where hard coded url is now

    return (
      <div id="myPage">
        <span>
          <Stickers className="sidebar" />
          <div
            style={{
              backgroundImage: `url(${pageURL})`
            }}
            id="newPage"
            className="dropzone"
            dropzone='copy'
            onDragOver={this.allowDrop}
            onDrop={this.drop}
            // onMouseOver={this.mouseTracker}
          />
        </span>

        <div>
          <Link to="/">
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
    stickerId: state.sticker.stickerId,
    myPage: state.page.singlePage,
    user: state.user
  }
}

export default connect(mapStateToProps)(PageCreate)
