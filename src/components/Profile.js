import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileForm from './ProfileForm'
import { fireSetInfo, fireGetInfo } from '../actions/profile';
import { firebase } from '../firebase/firebase';

export class Profile extends React.Component {
  onSubmit = (profile) => {
    this.props.fireSetInfo(profile);
    this.props.fireGetInfo();
    this.props.history.push('/');
  };

  render() {
    const user = this.props.user
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title"></h1>
          </div>
        </div>
        <div>
        </div>
        <div className="content-container">
          <ProfileForm
            onSubmit={this.onSubmit}
          />
          <p>Name: {user.name}</p>
          <p>Current Bio: {user.bio}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.profile
});

const mapDispatchToProps = (dispatch) => ({
  fireSetInfo: (profile) => dispatch(fireSetInfo(profile))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);