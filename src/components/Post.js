import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fireUpVote, fireDownVote } from '../actions/posts';

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.location.post
    }
  }
  upVote = () => {
    this.props.fireUpVote(this.state.post.id)
  }
  downVote = () => {
    this.props.fireDownVote(this.state.post.id)
  }
  render() {
    const { author, body, date, title, id } = this.state.post
    return (
      <div className="content-container">
      <button onClick={this.upVote}>Upvote</button>
      <button onClick={this.downVote}>Downvote</button>
        <div className="list-header">
          {title}
          <br />
          by {author} @ {date}
        </div>
        <div className="list-body">
          <div>
            <p className="list-item__data">
              {body}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({

})
const mapDispatchToProps = (dispatch) => ({
  fireUpVote: (id) => dispatch(fireUpVote(id)),
  fireDownVote: (id) => dispatch(fireDownVote(id))
})

export default connect(undefined, mapDispatchToProps)(Post);