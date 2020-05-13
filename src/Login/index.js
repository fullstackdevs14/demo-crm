import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import useSetToken from '../core/state/hooks/useSetToken';
import history from '../core/history';
import BgImage from '../components/BgImage';
import LoginForm from './LoginForm';

const useStyles = makeStyles({
  content: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const setToken = useSetToken();
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: async ({ login }) => {
      await setToken({
        variables: {
          token: login.token
        }
      });
      history.push('/');
    },
    onError: ({ graphQLErrors }) => {
      if (
        graphQLErrors[0] &&
        graphQLErrors[0].extensions.code === 'UNAUTHENTICATED'
      ) {
        setError('Email or password is incorrect!');
        return;
      }

      setError('Unknown error');
    }
  });

  const handleErrorAlertClose = () => {
    setError('');
  };

  return (
    <div>
      <BgImage />
      <div className={classes.content}>
        <LoginForm
          onSubmit={async (values) => {
            try {
              await login({
                variables: values
              });
            } catch (err) {}
          }}
          loading={loading}
        />
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          onClose={handleErrorAlertClose}
        >
          <Alert onClose={handleErrorAlertClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Login;
