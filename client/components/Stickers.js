import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {dropSticker, allStickers} from '../store'

class Stickers extends React.Component {
  constructor() {
    super()
    this.dragStart = this.dragStart.bind(this)
  }

  componentDidMount() {
    this.props.initiateStickers()
  }

  dragStart(e) {

    e.dataTransfer.effectAllowed = "copy";

    const stickerId = e.target.id
    console.log('stickerId in Drag Start:', stickerId)
    this.props.identifyStickerToDrop(stickerId)
  }

  render() {
    const stickers = this.props.allStickers
    console.log(stickers)

    return (
      <div className="drag-zone" id="stickerList">
        <h1>Decorate Your Comic</h1>
        <ul>
          <div>
            {stickers ? (
              stickers.map(sticker => {
                return (
                  <div className="sticky" key={sticker.id}>
                    <li
                    >
                      <img draggable="true"
                      id={sticker.id}
                      onDragStart={this.dragStart}src={sticker.location} className="stickers" />
                    </li>
                  </div>
                )
              })
            ) : (
              <div />
            )}
          </div>
        </ul>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    allStickers: state.sticker.allStickers
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
