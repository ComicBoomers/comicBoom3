import React from 'react'
import {connect} from 'react-redux'
import {gotPage} from '../store'
import {Link} from 'react-router-dom'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TumblrShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TumblrIcon,
  EmailIcon,
} from 'react-share';
import axios from 'axios'
import history from '../history'

const areYouSure = false

class SinglePage extends React.Component {
  constructor() {
    super()
    this.state = {
      areYouSure
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.triggerConfirm = this.triggerConfirm.bind(this)
  }
  componentDidMount() {
    let pageId = Number(this.props.match.params.pageId)
    this.props.getOnePage(pageId)
  }

  triggerConfirm() {
    this.setState({
      areYouSure: true
    })
  }

  async handleDelete() {
    let pageId = Number(this.props.match.params.pageId)
    this.props.getOnePage(pageId)
    const foo = await axios.delete(`/api/page/${pageId}`)
    Promise.all([foo, history.push('/')])
  }

  render() {
    let shareUrl = this.props.myPage.location
    return (
      <div id="myPage">
        {this.props.myPage ? (
          <div className="myPage">
            <div />
            {/* <h1 className=''>Comic Title</h1> */}
            {/* <button type="button">
              <Link to="/createComic">
                Edit Comic
              </Link>
            </button> */}
            {this.state.areYouSure ? (
              <button type="button" onClick={this.handleDelete}>
                Confirm Delete
              </button>
            ) : (
              <button type="button" onClick={this.triggerConfirm}>
                Delete Comic
              </button>
            )}
            <img src={this.props.myPage.location} />
            <h3 className='pageText'>Share It!</h3>
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon
              size={32}
              round />
            </FacebookShareButton>
            <TwitterShareButton
            url={shareUrl}>
            <TwitterIcon
              size={32}
              round />
            </TwitterShareButton>
            <WhatsappShareButton
              url={shareUrl}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TumblrShareButton
            url={shareUrl}>
            <TumblrIcon
              size={32}
              round />
            </TumblrShareButton>
            <EmailShareButton
            url={shareUrl}>
            <EmailIcon
              size={32}
              round />
            </EmailShareButton>
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    myPage: state.page.singlePage
  }
}
const mapDispatch = dispatch => {
  return {
    getOnePage: pageId => dispatch(gotPage(pageId))
  }
}
export default connect(mapState, mapDispatch)(SinglePage)
