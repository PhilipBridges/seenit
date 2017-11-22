import React, { Component } from 'react';
import { connect } from 'react-redux'
import Seens from './Seens'
import { Link } from 'react-router-dom';
import { getPosts } from '../actions/posts';
import { List, ListItem } from 'material-ui/List';
import Post from './Post'

export class Seen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xPosts: this.props.newPosts
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.newPosts.length >= 1) {
      this.props.getPosts(nextProps.seen.posts)
      this.setState({ xPosts: this.props.newPosts })
    }
  }
  render() {
    const { title, body, author, id } = this.props.seen
    const posts = [] = this.props.newPosts
    const newPosts = Object.values(posts)
    return (
      <div>
          <Link to={`/s/${title}/create`} id={this.props.id}>New Post</Link>
          {newPosts.map((post) => (
            <div key={post.title}>
              <Link to={`/s/posts/${post.title}`} {...post}>
                {post.title}
              </Link>
            </div>
          ))}

        <div className="seens">
          <div className="list-body">
            <div>
              <h3 className="list-item__title">
                {title}
              </h3>
              <p className="list-item__data">
                {body}
              </p>
              <p>Created by {author}</p>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  seen: state.seens.find((seen) => seen.title === props.match.params.title),
  newPosts: state.posts !== null ? state.posts : []
});

const mapDispatchToProps = (dispatch) => ({
  getPosts: (id) => dispatch(getPosts(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Seen);