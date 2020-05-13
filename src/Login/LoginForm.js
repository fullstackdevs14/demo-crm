import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: 400,
    padding: 24
  },
  title: {
    textAlign: 'center',
    marginBottom: 20
  },
  actions: {
    marginTop: 24
  },
  link: {
    width: '100%',
    textAlign: 'center',
    display: 'block',
    marginTop: 20
  }
});

const LoginForm = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Demo CRM
      </Typography>
      <TextField
        id="email"
        label="Email"
        type="email"
        fullWidth
        variant="filled"
      />
      <TextField
        id="standard-password-input"
        label="Password"
        type="password"
        fullWidth
        variant="filled"
        autoComplete="off"
      />
      <div className={classes.actions}>
        <Button color="primary" variant="contained" fullWidth>
          Login
        </Button>
        <Link
          className={classes.link}
          href="/register"
          variant="body2"
          color="textPrimary"
        >
          Register
        </Link>
      </div>
    </Card>
  );
};

export default LoginForm;
