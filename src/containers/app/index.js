import React from 'react';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from '../home';

const App = () =>
  <MuiThemeProvider>
    <main>
      <Route exact path="/" component={Home} />
      <Route path="/infringements/:chartYear?" component={Home} />
    </main>
  </MuiThemeProvider>;

export default App;
