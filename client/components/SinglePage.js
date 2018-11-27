import React from 'react'
import {connect} from 'react-redux'
import {gotPage} from '../store'
import {Link} from 'react-router-dom'
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  EmailShareButton,
} from 'react-share';

class SinglePage extends React.Component {
  componentDidMount() {
    let pageId = Number(this.props.match.params.pageId)
    this.props.getOnePage(pageId)
  }
  render() {
    console.log("PROPS", this.props.myPage)
    return (
      <div id="myPage">
        {this.props.myPage ? (
          <div className="myPage">
            <div />
            {/* <h1 className=''>Comic Title</h1> */}
            <button type="button">
              <Link to="/createComic" page={this.props.myPage.location}>
                Edit Page
              </Link>
            </button>
            <img src={this.props.myPage.location} />
            <button>Share It!

            </button>
              <TwitterShareButton children={this.props.myPage} url={this.props.myPage.location} />
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
