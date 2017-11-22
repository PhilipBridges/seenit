import React from 'react';
import { connect } from 'react-redux';
import AddSeenForm from './AddSeenForm';
import { fireAddSeen } from '../actions/seens';

export class AddSeenPage extends React.Component {
  onSubmit = (seen) => {
    this.props.fireAddSeen(seen);
    this.props.history.push('/');
  };
  user = this.props.user
  isAuthed = this.props.isAuthed
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Seen</h1>
          </div>
        </div>
        <div className="content-container">
          <AddSeenForm
            onSubmit={this.onSubmit}
            user={this.user}
            isAuthed={this.isAuthed}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.profile,
  isAuthed: state.auth.uid && state.auth.uid.length > 1
});

const mapDispatchToProps = (dispatch) => ({
  fireAddSeen: (seen) => dispatch(fireAddSeen(seen))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSeenPage);