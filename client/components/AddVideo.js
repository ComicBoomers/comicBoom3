import React from 'react'
import axios from 'axios'
import Loading from './Loading'
import history from '../history'

export default class AddVideo extends React.Component {
  constructor() {
    super()
    this.state = {
      video: {},
      loadingStatus: '' // starts '', moves to 'loading'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      video: event.target.files[0]
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    if (this.state.video.name) {
      let formData = new FormData()
      formData.append('video', this.state.video)
      this.setState({
        loadingStatus: 'loading'
      })
      let loaded = await axios.post('/api/upload', formData)
      console.log('handle submit loaded in AddVideo', loaded)
      if (loaded) {
        history.push('/createComic')
      }
    }
  }

  render() {
    return this.state.loadingStatus === '' ? (
      <div id="myPage">
        <div>
          <div>
            <h3 className="instructions">
              Take a video and turn it into a comicBOOM!
            </h3>
          </div>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <label htmlFor="video" className="instructions">
              👀 Add A Video 👀
            </label>
            <input
              type="file"
              id="file"
              name="video"
              accept="video/*"
              onChange={this.handleChange}
              color="white"
              className="custom-file-input uploadvideo"
            />
            <button type="submit" className="boomify">
              BOOMIFY
            </button>
          </form>
        </div>
      </div>
    ) : (
      <Loading />
    )
  }
}
