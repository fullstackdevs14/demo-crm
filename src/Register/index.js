import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import useSetToken from '../core/state/hooks/useSetToken';
import history from '../core/history';
import BgImage from '../components/BgImage';
import RegisterForm from './RegisterForm';

const useStyles = makeStyles({
  content: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const REGISTER_MUTATION = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

const Register = () => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const setToken = useSetToken();
  const [register, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: async ({ createUser }) => {
      await setToken({
        variables: {
          token: createUser.token
        }
      });
      history.push('/');
    },
    onError: ({ graphQLErrors }) => {
      if (
        graphQLErrors[0] &&
        graphQLErrors[0].extensions.exception &&
        graphQLErrors[0].extensions.exception.fields &&
        graphQLErrors[0].extensions.exception.fields[0] === 'email'
      ) {
        setError('A user already exists with the email!');
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
        <RegisterForm
          onSubmit={async (values) => {
            try {
              await register({
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

export default Register;
