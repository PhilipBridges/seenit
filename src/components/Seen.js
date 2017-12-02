import React, { Component } from 'react';
import { connect } from 'react-redux'
import Seens from './Seens'
import { Link } from 'react-router-dom';
import { getPosts } from '../actions/posts';
import Post from './Post'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import RaisedButton from './RaisedButton';

export class Seen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xPosts: this.props.newPosts
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ xPosts: this.props.newPosts })
  }
  componentWillMount() {
    this.setState({ xPosts: this.props.newPosts })
  }
  render() {
    const { title, body, author, id } = this.props.seen
    const posts = this.state.xPosts
    const zPosts = Object.values(posts)
    return (
      <div>
        <div className="seens">
          <div className="seens-body">
            <div>
              <h3 className="list-item__title">
                {title}
              </h3>
              <p className="list-item__data">
                {body}
              </p>
              <p>Created by {author}</p>
              <Link to={`/s/${title}/create`} id={this.props.id}>
                <RaisedButton />
              </Link>
            </div>
          </div>
        </div>
        <List className="list-body">
          {posts.map((post) => (
            <Link className="list-item" to={{
              pathname: `/s/${post.seen}/posts/${post.title}`,
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

const mapStateToProps = (state, props) => ({
  seen: state.seens.find((seen) => seen.title === props.match.params.title),
  newPosts: state.posts !== [] ? state.posts : []
});

const mapDispatchToProps = (dispatch) => ({
  getPosts: (id) => dispatch(getPosts(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Seen);