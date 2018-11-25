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

    <div className='drag-zone' id='stickerList'>
     <h1>Decorate Your Comic</h1>
      <ul >
        <div>
        { stickers ?
          stickers.map(sticker => {
            return (
              <div  className='sticky' key={sticker.id}>
              <li  id={sticker.id} onDragStart={this.dragStart(event)}><img src={sticker.location} className='stickers'/></li>
              </div>
            )
          }) : <div/>
        }
        </div>
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
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Stickers)
