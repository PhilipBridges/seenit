import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import { Link } from 'react-router-dom'
import { fireGetPosts, getPosts } from '../actions/posts';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { fireGetComments, getComments } from '../actions/comments';

export class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: this.props.posts || []
    }
  }
  handleClick = (e) => {
    e.stopPropagation();
    const id = e.currentTarget.id
    const title = e.currentTarget.title
    let getComments = this.props.getComments
    this.props.fireGetComments(id)
  }
  componentWillReceiveProps() {
    if (this.props.posts.length >= 1) {
      this.setState({ posts: this.props.posts })
    } else {
      this.setState({ posts: [] })
    }
  }
  componentWillMount() {
    this.props.fireGetPosts()
  }
  componentWillUnmount() {
    this.props.getPosts()
    this.setState({ posts: [] })
  }
  render() {
    const newPosts = this.state.posts
    return (
      <div className="list-body">
      {console.log(this.props)}
        <List className="list-body">
          {newPosts.sort((a, b) => {
            return a.votes < b.votes
          }).map((post) => (
            <Link onClick={this.handleClick} className="list-item" to={{
              pathname: `/s/${post.seen}/posts/${post.title}`,
              post: { ...post }
            }}
              key={post.postid}
              {...post}>
              <ListItem className="mui-fix" button>
                <p>{post.votes} - {post.title}
                  <br />
                  by {post.author} in {post.seen}
                </p>
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  fireGetPosts: () => dispatch(fireGetPosts())
})

const mapDispatchToProps = (dispatch) => ({
  fireGetPosts: () => dispatch(fireGetPosts()),
  getPosts: (id) => dispatch(getPosts(id)),
  fireGetComments: (comments) => dispatch(fireGetComments(comments)),
  getComments: (comments) => dispatch(getComments(comments))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList)