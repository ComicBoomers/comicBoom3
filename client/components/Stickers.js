import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { dropSticker, allStickers } from '../store'


class Stickers extends React.Component {

  constructor() {
    super()
    this.dragStart=this.dragStart.bind(this)
  }

  componentDidMount() {
    this.props.initiateStickers()

  }

  dragStart(e) {
    const stickerId = e.target.id
    this.props.identifyStickerToDrop(stickerId)
  }

  render() {
  const stickers = this.props.allStickers
  console.log(stickers)

  return (

    <div class='drag-zone' id='stickerList'>
     <h1>YAY</h1>
      <ul>
        <label>STICKERS</label>
        { stickers ?
          stickers.map(sticker => {
            return (
              <li id={sticker.id} ondragstart={this.dragStart(event)}><img src={sticker.location} /></li>

            )
          }) : <div></div>
        }
      </ul>
    </div>
  )
      }
}

const mapStateToProps= state => {
  return {
    allStickers: state.page.allStickers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    identifyStickerToDrop(id) {
    dispatch(dropSticker(id))
    },
    initiateStickers() {
      dispatch(allStickers())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Stickers)
