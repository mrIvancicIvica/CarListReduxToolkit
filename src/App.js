import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import Routes from './Routes';

import './App.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#282c34',
    },
    secondary: {
      main: '#fefefe',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
