import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const LoadingPage = () => (
  <MuiThemeProvider>
    <div className="loader">
      <CircularProgress size={80}/>
    </div>
  </MuiThemeProvider>
);

export default LoadingPage;
