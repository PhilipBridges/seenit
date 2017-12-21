import React, { Component } from 'react';

export class ProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      bio: ''
    }
  }
  onSubmit = (e) => {
    e.preventDefault()
    const name = this.state.name
    const bio = this.state.bio

    this.props.onSubmit({
      name,
      bio
    })
  }
  onNameChange = (e) => {
    const name = e.target.value
    this.setState(() => ({ name }))
  }
  onBioChange = (e) => {
    const bio = e.target.value
    this.setState(() => ({ bio }))
  }
  render() {
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <textarea className="textarea" onChange={this.onNameChange} value={this.state.name} placeholder="name"></textarea>
          <textarea className="textarea" onChange={this.onBioChange} value={this.state.bio} placeholder="bio"></textarea>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default ProfileForm;