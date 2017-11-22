import React, { Component } from 'react';

export class AddSeenForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      body: '',
      author: this.props.user.name,
      date: 0
    }
  }
  onSubmit = (e) => {
    e.preventDefault()
    const title = this.state.title
    const body = this.state.body
    const author = this.state.author
    const date = this.state.date

    this.props.onSubmit({
      title,
      body,
      author,
      date
    })
  }
  onTitleChange = (e) => {
    const title = e.target.value
    if(title.match(/^\S*$/)){
      this.setState(() => ({title}))
    }
    
  }
  onBodyChange = (e) => {
    const body = e.target.value
    this.setState(() => ({body}))
  }
    render(){
      return (
        <div>
          <form className="form" onSubmit={this.onSubmit}>
            <input className="text-input" onChange={this.onTitleChange} value={this.state.title} placeholder="title" type="text"/>
            <textarea rows="8" className="textarea" onChange={this.onBodyChange} value={this.state.body} placeholder="body"></textarea>
            <button>Submit</button>
          </form>
        </div>
      )
    }
  }

export default AddSeenForm;