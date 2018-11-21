import React from 'react'
import {connect} from 'react-redux'
import {gotPage} from '../store'

class SinglePage extends React.Component {
	componentDidMount() {
		let pageId = Number(this.props.match.params.pageId);
		this.props.getOnePage(pageId);
	}
 render(){
   console.log('SinglePage Props', this.props)
   return(
     <div>
       {
         this.props.page &&
           <div>
         <h1>Comic Title</h1>
    <img src={this.props.page.location}/>
      </div>
       }
      </div>
   )
 }
}

const mapState = state =>{
  return{
    page: state.user.curUser.singlePage
  }
}
const mapDispatch = dispatch => {
  return{
    getOnePage: (pageId)=> dispatch(gotPage(pageId))
  }
}
export default connect(mapState, mapDispatch)(SinglePage)
