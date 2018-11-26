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
    let formData = new FormData()
    formData.append('video', this.state.video)
    this.setState({
      loadingStatus: 'loading'
    })
    let loaded = await axios.post('/api/upload', formData)
    console.log('handle submit loaded in AddVideo', loaded)
    if (loaded) {
      history.push('/home')
    }
  }

  render() {
    return this.state.loadingStatus === '' ? (
      <div id="myPage">
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <label htmlFor="video" className="pageText">
            Choose Your Video:
          </label>
          <input
            type="file"
            id="file"
            name="video"
            accept="video/*"
            onChange={this.handleChange}
            color="white"
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    ) : (
      <Loading />
    )
  }
}
