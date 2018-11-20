import interact from 'interactjs'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


// interact('.item').draggable({
//   onmove(event) {
//     console.log(event.pageX,
//                 event.pageY)
//   }
// })

/// className = 'dropzone' needs to be on current rendered gif page
class Stickers extends React.Component {

  constructor() {
    super()
    this.state = {
      stickers: []
    }
  }

  componentDidMount() {
    //get stickers location from database
    //get stickers from storage
    //put on state
  }

  render() {
  const stickerArr = this.state.stickers

  return (
    <div id='stickerList'>
      <ul>
        <label>STICKERS</label>
        {
          stickersArr.map(sticker => {
            return (
              <li className='drag-drop' ></li>
              //data={draggable:true, url:'stickerURL'} inside li?
            )
          })
        }
      </ul>
    </div>
  )
      }
}
