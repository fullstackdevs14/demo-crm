import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';

import history from './core/history';

import Login from './Login';
import Register from './Register';
import Portal from './Portal';

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Portal />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
