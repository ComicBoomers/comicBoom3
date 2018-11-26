import React from 'react'
import {connect} from 'react-redux'
import {gotPage} from '../store'

class SinglePage extends React.Component {
	componentDidMount() {
		let pageId = Number(this.props.match.params.pageId);
		this.props.getOnePage(pageId);
	}
 render(){
   return(
     <div id='myPage' >

       {
         this.props.myPage ?
           <div className='myPage' >
           <div/>
         {/* <h1 className=''>Comic Title</h1> */}
    <img src={this.props.myPage.location}/>
      </div>
       : <div/>}

      </div>
   )
 }
}

const mapState = state =>{
  return{
    myPage: state.page.singlePage
  }
}
const mapDispatch = dispatch => {
  return{
    getOnePage: (pageId)=> dispatch(gotPage(pageId))
  }
}
export default connect(mapState, mapDispatch)(SinglePage)
