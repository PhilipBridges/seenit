import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fireUpVote, fireDownVote } from '../actions/posts';
import AddPostForm from './AddPostForm'
import { fireAddComment, addComment, fireGetComments, getComments } from '../actions/comments';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post,
      user: this.props.userId,
      comments: this.props.comments
    }
  }
  componentWillMount(){
    this.props.fireGetComments(this.props.location.key)
  }
  onSubmit = (comment) => {
    this.props.fireAddComment(comment)
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
            <AddPostForm
              onSubmit={this.onSubmit}
              user={this.props.user}
              isAuthed={this.isAuthed}
              seen={this.state.post.seen}
              postId={this.state.post.id}
              id={this.props.id}
              titleshow={false}
            />
          </div>
          <div>
          {console.log(this.props)}
            <List className="list-body">
              {this.props.comments.map((comment) => (
                <ListItem key={comment.commentid} className="mui-fix" button>
                  by {comment.author} @ {comment.date}
                  <br/>
                  {comment.body}
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  user: state.profile,
  userId: state.auth.uid,
  id: state.auth.uid || undefined,
  comments: state.comments,
  post: state.posts
})

const mapDispatchToProps = (dispatch) => ({
  fireUpVote: (id) => dispatch(fireUpVote(id)),
  fireDownVote: (id) => dispatch(fireDownVote(id)),
  fireAddComment: (id, user) => dispatch(fireAddComment(id, user)),
  fireGetComments: (comments) => dispatch(fireGetComments(comments)),
  getComments: (comments) => dispatch(getComments(comments))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post);