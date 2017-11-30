import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fireUpVote, fireDownVote, fireUpdateVote } from '../actions/posts';

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.location.post,
      user: this.props.userId
    }
  }
  upVote = () => {
    this.props.fireUpVote(this.state.post.id, this.state.user)
  }
  downVote = () => {
    this.props.fireDownVote(this.state.post.id, this.state.user)
  }
  render() {
    const { author, body, date, title, id, votes } = this.state.post
    return (
      <div className="content-container">
      Score: {votes}
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
  userId: state.auth.uid
})
const mapDispatchToProps = (dispatch) => ({
  fireUpVote: (id) => dispatch(fireUpVote(id)),
  fireDownVote: (id) => dispatch(fireDownVote(id)),
  fireUpdateVote: (id, user) => dispatch(fireUpdateVote(id, user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post);