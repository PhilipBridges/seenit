import React from 'react';
import { connect } from 'react-redux';
import { startLogin, emailCreate } from '../actions/auth';
import LoginForm from './LoginForm';
import { history } from '../routers/AppRouter';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props)
  }
  onSubmit = (user) => {
    this.props.emailCreate(user.email, user.password).then(() => {
      history.push('/');
    })
  };
  render() {
    return (
      <div>
        
        <LoginForm className="test" onSubmit={this.onSubmit} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailCreate: (email, password) => dispatch(emailCreate(email, password))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
