import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { loginStyles } from './styles';
import { loginAction } from '../../redux/actions/login';
import { RootState } from '../../redux';
import { Routes } from '../../utils';
import Loader from '../Reusable/Loader';

const Login: FC = () => {
  const classes = loginStyles();
  const [state, setState] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { user, isLoggedIn, loginErrors } = useSelector((state: RootState) => {
    const { user, isLoggedIn, loginErrors } = state.login;

    return { user, isLoggedIn, loginErrors };
  });

  const history = useHistory();

  useEffect(() => {
    if (user?.token && isLoggedIn) {
      localStorage.setItem('token', user.token);
      history.push(Routes.Users);
    }
  }, [user, isLoggedIn, history]);

  useEffect(() => {
    if (loginErrors) {
      toast.error(loginErrors.message);
    }
  }, [loginErrors]);

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    setLoading(true);
    loginAction(state)(dispatch);
  };

  if (loading) {
    <Loader />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Diver Adz Sign in
        </Typography>

        <div className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleTextChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleTextChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href={Routes.Home} variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default withRouter(Login);
