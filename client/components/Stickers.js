import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { dropSticker, allStickers, oneSticker } from '../store'


class Stickers extends React.Component {

  constructor() {
    super()
    this.dragStart=this.dragStart.bind(this)
  }

  componentDidMount() {
    this.props.initiateStickers()

  }

  dragStart(e) {
    e.dataTransfer.effectAllowed = "copy";
    const stickerId = +e.target.id
    console.log(typeof stickerId)
    console.log(this.props.allStickers)

    const sticker = this.props.allStickers.filter(elem => elem.id === stickerId)
    console.log("sticker from filter", sticker[0])
    // this.props.identifyStickerToDrop(stickerId)
    this.props.gotChosenSticker(sticker[0])
  }

  render() {
  const stickers = this.props.allStickers
  console.log("stickers in render:", stickers)

  return (

    <div class='drag-zone' id='stickerList'>
     <h1>YAY</h1>
      <ul>
        <label>STICKERS</label>
        { stickers ?

          stickers.map(sticker => {
            return (
              <li draggable="true" onDragStart={this.dragStart}><img width="200" height="200" id={sticker.id} src={sticker.location} />{sticker.id}</li>

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
    },
    gotChosenSticker(sticker) {
      dispatch(oneSticker(sticker))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Stickers)
