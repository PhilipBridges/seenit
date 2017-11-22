import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import { Link } from 'react-router-dom'
import { fireGetPosts } from '../actions/posts';
import { getPosts } from '../actions/posts';

export class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: this.props.posts
    }
  }
  componentWillMount(){
    this.setState({ posts: [] })
    this.props.getPosts()
  }
  componentWillUnmount(){
    this.props.getPosts()
    this.setState({ posts: [] })
  }
  render() {
    return (
      <div className="list-body">
          {this.state.posts.map((post) => (
            <Link className="list-item" key={post.id} to={`/s/posts/${post.id}`} {...post}>
              <h3 className="list-item__title">
                {post.title}
              </h3>
              <p className="list-item__data">
                {post.author} @ {post.date}
              </p>
            </Link>
          )
          )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: () => state.posts.slice(0, 10),
  fireGetPosts: () => dispatch(fireGetPosts())
})

const mapDispatchToProps = (dispatch) => ({
  getPosts: (id) => dispatch(getPosts(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList)