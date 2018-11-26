import React from 'react'
import axios from 'axios'

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
    //tranfer to Loading component
  }

  render() {
    return (
      <div id='myPage'>

        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
        <label htmlFor="video" className='pageText'>Choose Your Video:</label>
          <input
            type="file"
            id="file"
            name="video"
            accept="video/*"
            onChange={this.handleChange}
            color='white'
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    )
  }
}
