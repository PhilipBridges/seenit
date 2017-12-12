import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import { Link } from 'react-router-dom'
import { fireGetPosts, getPosts, fireGetSinglePost } from '../actions/posts';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { fireGetComments, getComments } from '../actions/comments';
import { history } from '../routers/AppRouter';
import NewButton from './NewButton';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

export class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: this.props.pageItems || []
    }
  }
  handleClick = (e) => {
    const title = e.value.title
    const seen = e.value.seen
    const id = e.id
    this.props.fireGetComments(id)
    this.props.fireGetSinglePost(id).then((post) => {
      history.push(`/s/${seen}/posts/${title}`)
    })
  }
  componentWillReceiveProps() {
    if (this.props.posts.length >= 1) {
      this.setState({ posts: this.props.pageItems })
    } else {
      this.setState({ posts: [] })
    }
  }
  componentWillMount() {
    this.props.fireGetPosts()
  }
  componentWillUnmount() {
    this.setState({ posts: [] })
  }
  render() {
    const newPosts = this.props.pageItems.sort((a, b) => {
      return a.votes < b.votes
    })
    return (
      <div className="list-body">
        <List className="list-body">
          {newPosts.map((post) => (
            <NewButton onClick={() => this.handleClick({...post})} key={post.value.postid} {...post}>
              <ListItem className="mui-fix" >
                <p>{post.value.votes} - {post.value.title}
                  <br />
                  by {post.value.author} @ {moment(post.value.date).format('MMMM Do')} in {post.value.seen}
                </p>
              </ListItem>
            </NewButton>
          ))}
          {(this.props.isLoading) ? (
            <div>loading…</div>
          ) : (
            <div>
              <button
                className='button-clear'
                disabled={!this.props.hasPrevPage}
                onClick={this.props.onPrevPage}>
                newer
              </button>
    
              <button
                className='button-clear'
                disabled={!this.props.hasNextPage}
                onClick={this.props.onNextPage}>
                older
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
  getPosts: (id) => dispatch(getPosts(id)),
  fireGetComments: (comments) => dispatch(fireGetComments(comments)),
  getComments: (comments) => dispatch(getComments(comments)),
  fireGetSinglePost: (id) => dispatch(fireGetSinglePost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList)