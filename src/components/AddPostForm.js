import React, { Component } from 'react';
import uuid from 'uuid';

export class AddPostForm extends Component {
  constructor(props){
    super(props);
    const uuidv4 = require('uuid/v4');
    this.state = {
      title: '',
      body: '',
      author: this.props.user ? this.props.user.name : "",
      date: 0,
      seen: this.props.seen || '',
      seenname: this.props.seen || '',
      seenid: this.props.seen ? this.props.seen.id : '',
      postid: uuidv4(),
      votes: 1,
      voters: [this.props.id] || undefined,
      commentpostid: this.props.postId,
      commentid: uuidv4(),
      titleshow: this.props.titleshow
    }
  }
  onSubmit = (e) => {
    e.preventDefault()
    const title = this.state.title
    const body = this.state.body
    const author = this.state.author
    const date = this.state.date
    const seen = this.state.seen.title
    const seenname = this.state.seenname
    const seenid = this.state.seenid
    const postid = this.state.postid
    const votes = this.state.votes
    const voters = this.state.voters
    const commentpostid = this.state.commentpostid
    const commentid = this.state.commentid

    this.props.onSubmit({
      title,
      body,
      author,
      date,
      seen,
      seenid,
      postid,
      votes,
      voters,
      commentpostid,
      seenname,
      commentid
    })
  }
  onTitleChange = (e) => {
    const title = e.target.value
    this.setState(() => ({title}))
  }
  onBodyChange = (e) => {
    const body = e.target.value
    this.setState(() => ({body}))
  }
    render(){
      return (
        <div>
          <form className="form" onSubmit={this.onSubmit}>
          {(this.state.titleshow) 
            ? 
            <input className="text-input" onChange={this.onTitleChange} titleshow={this.state.title} value={this.state.title} placeholder="title" type="text"/>
            :
            <div></div>
          }
            <textarea rows="8" className="textarea" onChange={this.onBodyChange} value={this.state.body} placeholder="body"></textarea>
            <button>Submit</button>
          </form>
        </div>
      )
    }
  }

export default AddPostForm;