import React from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import history from './core/history';
import client from './core/apollo-client';

import PrivateRoute from './core/PrivateRoute';

import Login from './Login';
import Register from './Register';
import Portal from './Portal';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <PrivateRoute path="/" component={Portal} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
