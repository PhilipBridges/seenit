import React, { Component } from 'react';
import { connect } from 'react-redux'
import Seens from './Seens'
import { Link } from 'react-router-dom';
import { getPosts, fireGetSinglePost } from '../actions/posts';
import Post from './Post'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import RaisedButton from './RaisedButton';
import { fireGetComments, getComments } from '../actions/comments';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import NewButton from './NewButton';
import { history } from '../routers/AppRouter';


export class Seen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xPosts: this.props.newPosts,
      seenName: this.props.seen.title
    }
  }
  buttonClick = (e) => {
    const title = e.currentTarget.title
    const seen = this.state.seenName
    const id = e.currentTarget.id
    this.props.fireGetComments(id)
    this.props.fireGetSinglePost(id).then((post) => {
      history.push(`/s/${seen}/posts/${title}`)
    })
    
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
              <NewButton onClick={this.buttonClick} key={post.postid} {...post}>
                <ListItem className="mui-fix" >
                  <p>{post.votes} - {post.title}
                    <br />
                    by {post.author} @ {post.date}
                  </p>
                </ListItem>
              </NewButton>
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
  getPosts: (id) => dispatch(getPosts(id)),
  fireGetComments: (comments) => dispatch(fireGetComments(comments)),
  fireGetSinglePost: (id) => dispatch(fireGetSinglePost(id)),
  getComments: (comments) => dispatch(getComments(comments))
});

export default connect(mapStateToProps, mapDispatchToProps)(Seen);