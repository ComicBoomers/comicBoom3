import React from 'react'

export default class AddVideo extends React.Component{
  constructor(){
    super()
    this.state = {
      video: ''
    }
    this.handleChange= this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    console.log(event.target.value)

    this.setState({
      video: event.target.value
    })
  }
handleSubmit(event){
  event.preventDefault()
  console.log('submitting to database', this.state)
  //create a thunk to send this back and get this chopped up
  //maybe put request to storage
   //not sure how this will work when this information is coming from a local source
}
  render(){
    return(
      <div>
<label htmlFor="video">Choose Your Video:</label>
<input type="file" id="video" name="video" accept="video/*" onChange={this.handleChange}/>
<button type ='submit' onClick ={this.handleSubmit}>Upload</button>
     </div>
    )
  }
}
