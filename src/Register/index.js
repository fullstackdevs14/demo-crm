import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

const Register = () => {
  const classes = useStyles();

  return (
    <div>
      <BgImage />
      <div className={classes.content}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
