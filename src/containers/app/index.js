import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from '../home';
import Hoc from '../hoc';
import HocIi from '../hocii';
import Nodes from '../nodes';

const App = () =>
  <MuiThemeProvider>
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/nodes" component={Nodes} />
        <Route exact path="/hocii" component={HocIi} />
        <Route exact path="/hoc" component={Hoc} />
        <Route path="/infringements/:chartYear?" component={Home} />
      </Switch>
    </main>
  </MuiThemeProvider>;

export default App;
