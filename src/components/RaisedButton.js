import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: '#177375',
    fontSize: '14px',
    color: 'white',
    display: 'inline'
  },
  input: {
    display: 'none',
  },
});

function RaisedButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button raised className={classes.button}>
        New Post
      </Button>
    </div>
  );
}



export default withStyles(styles)(RaisedButtons);