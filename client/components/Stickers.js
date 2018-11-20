import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


class Stickers extends React.Component {

  constructor() {
    super()
    this.state = {
      stickers: [],
      id: null
    }

    this.dragStart=this.dragStart.bind(this)
  }

  componentDidMount() {
    //get stickers from storage in an array if possible
    //put on state
  }

  dragStart(e) {
    const id = e.target.id
    this.setState({id})
  }

  render() {
  const stickerArr = this.state.stickers

  //sticker.url below is a guess so be sure to check what that object being returned from storage really looks like
  return (
    <div class='drag-zone' id='stickerList'>
      <ul>
        <label>STICKERS</label>
        {
          stickerArr.map(sticker => {
            return (
              <li id={sticker.id} ondragstart={this.dragStart(event)}><img src={sticker.url} /></li>

            )
          })
        }
      </ul>
    </div>
  )
      }
}

export default Stickers
