import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
});

export class TextFieldMargins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    const email = this.state.email
    const password = this.state.password

    this.props.onSubmit({
      email,
      password
    })
  }
  onEmailChange = (e) => {
    const email = e.target.value
    this.setState(() => ({ email }))
  }
  onPasswordChange = (e) => {
    const password = e.target.value
    this.setState(() => ({ password }))
  }
  render() {
    const { classes } = this.props;
    return (
        <form onSubmit={this.onSubmit} className='box-layout__box'>
          <h3 style={{ textAlign: 'center' }}>Create your account</h3>
          <TextField
            label='Email'
            id="margin-dense"
            className={classes.textField}
            margin="dense"
            inputClassName='test'
            labelClassName='test'
            onChange={this.onEmailChange}
            value={this.state.email}
          />
          <TextField
            htmlFor="password"
            label='Password'
            id="margin-normal"
            className={classes.textField}
            margin="normal"
            inputClassName='test'
            labelClassName='test'
            type='password'
            onChange={this.onPasswordChange}
            value={this.state.password}
          />
          <button>Submit</button>
        </form>
    );
  }
}


export default withStyles(styles)(TextFieldMargins);