import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

// We can inject some CSS into the DOM.
const styles = {
  button: {
    fontSize: "inherit",
    textTransform: "none",
    justifyContent: "left",
    fontWeight: "inherit",
    fontFamily: "Roboto, sans-serif",
    padding: "0"
  },
};

function NewButton(props) {
  return (
      <Button className={props.classes.button} key={props.id} {...props} >
      </Button>
  );
}

export default withStyles(styles)(NewButton);