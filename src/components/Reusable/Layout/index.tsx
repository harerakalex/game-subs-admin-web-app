import React, { FC, ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

import { layoutStyles } from './styles';
import { Routes } from '../../../utils';
import { RootState } from '../../../redux';
import { getAdminProfileAction } from '../../../redux/actions/login';
import Loader from '../Loader';
import { IToken } from '../../../redux/interfaces/custom.interface';

interface Props {
  children: ReactElement;
}

const Layout: FC<Props> = ({ children }) => {
  const classes = layoutStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const { user, isLoggedIn, getProfileLoading } = useSelector((state: RootState) => {
    const { user, isLoggedIn, getProfileLoading } = state.login;

    return { user, isLoggedIn, getProfileLoading };
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      if (user?.token) {
        localStorage.setItem('token', user.token);
      }
      history.push(Routes.Login);
    }

    if (token && !user?.token) {
      try {
        const decoded: IToken = jwtDecode(token);
        getAdminProfileAction(decoded.username)(dispatch);
      } catch (error) {
        localStorage.removeItem('token');
        window.location.href = Routes.Home;
      }
    }

    if (!user?.token && !isLoggedIn) {
      history.push(Routes.Login);
    }
  }, [user, isLoggedIn, history, dispatch]);

  if (getProfileLoading) {
    <Loader />;
  }

  return (
    <>
      {isLoggedIn ? (
        <div className={classes.root}>
          <main>{children}</main>
        </div>
      ) : null}
    </>
  );
};

export default Layout;
