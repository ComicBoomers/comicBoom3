import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Stickers from './Stickers'
import {sticker} from '../store'
import axios from 'axios'
import Loading from './Loading'
import history from '../history'

class PageCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      stickerId: '0',
      stickerX: null,
      stickerY: null,
      loadingStatus: ''
    }

    this.allowDrop = this.allowDrop.bind(this)
    this.drop = this.drop.bind(this)
    // this.mouseTracker = this.mouseTracker.bind(this)
    this.savePage = this.savePage.bind(this)
  }

  allowDrop(e) {
    e.preventDefault()
  }

  drop(e) {
    ///stickers currently shift slightly to the bottom right on drop and while our dropzone div prevents stickers from jutting out past the top and left boundaries it does not do so for the bottom and right...??
    const id = this.props.stickerId

    //Document Relative: (mouse coords on Drop) - rounded to match save coords
    const [mouseX, mouseY] = [Math.round(e.pageX), Math.round(e.pageY)]

    //Placing sticker at mouse drop coordinates
    const itm = document.getElementById(id)

    const stickerPlacement = (X, Y) => {
      const clone = itm.cloneNode(true)
      clone.style.position = 'absolute'
      clone.style.top = `${Y}px`
      clone.style.left = `${X}px`
      return clone
    }

    e.target.append(stickerPlacement(mouseX, mouseY))

    //drop-zone coords (top, left corner)
    const elem = document.getElementById('newPage')
    const coords = elem.getBoundingClientRect()
    const [elemX, elemY] = [coords.left + pageXOffset, coords.top + pageYOffset]

    //mouse coords relative to dropzone(gif)
    const inHouseId = Number(id)
    const [x, y] = [Math.round(mouseX - elemX), Math.round(mouseY - elemY)]
    this.setState({stickerId: `${inHouseId}`, stickerX: x, stickerY: y})
  }

  async savePage() {
    // for now will only merge 1 sticker to gif and save gif (gif saved via backend so upon response it will be in the database)
    this.setState({
      loadingStatus: 'loading'
    })
    const objToMerge = {
      stickerId: this.state.stickerId,
      stickerX: this.state.stickerX,
      stickerY: this.state.stickerY
    }
    const res = await axios.put('/api/upload', objToMerge)
    if (res) {
      history.push('/')
    }
  }

  render() {
    const userId = this.props.user.id
    const pagePath = `/tmp/gifs/${userId}/temp.gif`
    const loading = this.state.loadingStatus

    return loading === 'loading' ? (
      <Loading />
    ) : (
      <div id="myPage">
        <div>
          <h3 className="instructions">
            Add a Sticker to your comicBOOM! Click 'save' to continue
          </h3>
        </div>
        <div>
          <Stickers className="sidebar" />
          {/* <img src={pageURL} /> */}
          <div
            style={{
              backgroundImage: `url(${pagePath})`
            }}
            id="newPage"
            className="dropzone onegifonly"
            dropzone="copy"
            onDragOver={this.allowDrop}
            onDrop={this.drop}
            // onMouseOver={this.mouseTracker}
          />
        </div>

        <div>
          <button className="boomify" type="button" onClick={this.savePage}>
            SAVE
          </button>
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
