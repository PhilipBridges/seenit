import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import { Link } from 'react-router-dom'
import { fireGetPosts, getPosts, fireGetSinglePost, fireNextPosts, firePrevPosts } from '../actions/posts';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { fireGetComments, getComments } from '../actions/comments';
import { history } from '../routers/AppRouter';
import NewButton from './NewButton';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
const injectTapEventPlugin = require("react-tap-event-plugin");

export class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: this.props.posts
    }
  }
  handleClick = (e) => {
    const title = e.title
    const seen = e.seen
    const id = e.id
    this.props.fireGetComments(id)
    this.props.fireGetSinglePost(id).then((post) => {
      history.push(`/s/${seen}/posts/${title}`)
    })
  }
  nextClick = (e) => {
    this.props.fireNextPosts(e)
  }
  prevClick = (e) => {
    this.props.firePrevPosts(e)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ posts: this.props.posts })
  }
  componentWillUnmount() {
    this.setState({ posts: [] })
  }
  render() {
    return (
      <div className="list-body">
        <List className="list-body">
          {this.state.posts.sort((a, b) => {
            return a.votes < b.votes
          }).map((post) => (
            <NewButton onClick={() => this.handleClick({ ...post })} key={post.postid} {...post}>
              <ListItem className="mui-fix" >
                <p>{post.votes} - {post.title}
                  <br />
                  by {post.author} @ {moment(post.date).format('MMMM Do')} in {post.seen}
                </p>
              </ListItem>
            </NewButton>
          ))}
          {(this.props.isLoading) ? (
            <div>loading…</div>
          ) : (
              <div>
                <button
                  className={!this.props.posts.length > 1 ? 'page-button__disabled' : 'page-button'}
                  onClick={() => this.prevClick(this.state.posts[0].votes)}
                  onTouchTap={() => this.prevClick(this.state.posts[0].votes)}
                >
                  prev
              </button>

                <button
                  className={!this.props.posts.length > 1 ? 'page-button__disabled' : 'page-button'}
                  onClick={() => this.nextClick(this.state.posts[this.state.posts.length -1 ].votes)}
                  onTouchTap={() => this.nextClick(this.state.posts[this.state.posts.length -1 ].votes)}
                >
                  next
              </button>
              </div>
            )}
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
  fireNextPosts: (e) => dispatch(fireNextPosts(e)),
  firePrevPosts: (e) => dispatch(firePrevPosts(e)),
  getPosts: (id) => dispatch(getPosts(id)),
  fireGetComments: (comments) => dispatch(fireGetComments(comments)),
  getComments: (comments) => dispatch(getComments(comments)),
  fireGetSinglePost: (id) => dispatch(fireGetSinglePost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList)