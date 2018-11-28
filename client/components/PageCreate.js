import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Stickers from './Stickers'
import {sticker} from '../store'

class PageCreate extends React.Component {
  constructor() {
    super()
    this.allowDrop = this.allowDrop.bind(this)
    this.drop = this.drop.bind(this)
    // this.savePage=this.savePage.bind(this)
  }

  allowDrop(e) {
    e.preventDefault()
  }

  drop(e) {
    const id = this.props.stickerId
    console.log('id:', id)

    const itm = document.getElementById(id)
    e.target.append(itm.cloneNode(true))
  }

  // savePage() {
  //   //everything inside the 'newPage' divId should be saved like a screenshot to storage as a single image then image location url from storage is saved to db with logged in user's userId
  // }

  render() {
    // page = this.props.myPage.location
    //place ${page} where hard coded url is now

    return (
      <div id="myPage">
        <span>
          <Stickers/>
          <div
            style={{
              backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/comic-server.appspot.com/o/sticker%2Ftest.gif?alt=media&token=bb169f2b-a2f3-40aa-8e0a-ede072ca5aa7")`
            }}
            id="newPage"
            className="dropzone"
            onDragOver={this.allowDrop}
            onDrop={this.drop}
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
    stickerId: state.sticker.stickerId
    //, myPage: state.page.myPage
  }
}

export default connect(mapStateToProps)(PageCreate)
