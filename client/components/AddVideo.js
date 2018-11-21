import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class AddVideo extends React.Component {
  constructor() {
    super()
    this.state = {
      video: {}
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
    console.log('submitting to database', this.state.video)
    let formData = new FormData()
    formData.append('video', this.state.video)
    await axios.post('/api/upload', formData)
  }

  render() {
    return (
      <div>
        <Link to='/home'>
          <button>Cancel</button>
        </Link>
        <br /><br />
        <label htmlFor="video">Choose Your Video:</label>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <input
            type="file"
            id="file"
            name="video"
            accept="video/*"
            onChange={this.handleChange}
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    )
  }
}
