import React, { Component } from 'react';

export class ProfileForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      bio: ''
    }
  }
  onSubmit = (e) => {
    e.preventDefault()
    const bio = this.state.bio

    this.props.onSubmit({
      name,
      bio
    })
  }
  onBioChange = (e) => {
    const bio = e.target.value
    this.setState(() => ({bio}))
  }
    render(){
      return (
        <div>
          <form className="form" onSubmit={this.onSubmit}>
            <textarea className="textarea" onChange={this.onBioChange} value={this.state.bio} placeholder="bio"></textarea>
            <button>Submit</button>
          </form>
        </div>
      )
    }
  }

export default ProfileForm;