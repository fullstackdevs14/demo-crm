import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

const Login = () => {
  const classes = useStyles();

  return (
    <div>
        <BgImage />
        <div className={classes.content}>
          <LoginForm />
        </div>
    </div>
  );
};

export default Login;
