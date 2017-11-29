import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import { Link } from 'react-router-dom'
import { fireGetPosts } from '../actions/posts';
import { getPosts } from '../actions/posts';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

export class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: this.props.posts.sort((a, b) => {
        return a.votes < b.votes
      })
    }
  }
  componentWillReceiveProps() {
    if (this.props.posts.length >= 1) {
      this.setState({ posts: this.props.posts })
    } else {
      this.setState({ xPosts: [] })
    }
  }
  componentWillMount() {
    this.setState({ posts: [] })
    this.props.getPosts()
  }
  componentWillUnmount() {
    this.props.getPosts()
    this.setState({ posts: [] })
  }
  render() {
    const newPosts = this.state.posts
    return (
      <div className="list-body">
        <List className="list-body">
          {newPosts.map((post) => (
            <Link className="list-item" to={{
              pathname: `/s/posts/${post.title}`,
              post: { ...post }
            }}
              key={post.postid}
              {...post}>
              <ListItem className="mui-fix" button>
                <p>{post.votes} - {post.title}
                  <br />
                  by {post.author}
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
  getPosts: (id) => dispatch(getPosts(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList)