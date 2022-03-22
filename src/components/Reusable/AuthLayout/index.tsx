import React, { ReactElement } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { authLayoutStyles } from './styles';
import { Routes } from '../../../utils';
import { RootState } from '../../../redux';

interface Props {
  children: ReactElement;
}

const AuthLayout = ({ children }: Props): ReactElement => {
  const classes = authLayoutStyles();

  const history = useHistory();

  const { isLoggedIn } = useSelector((state: RootState) => {
    const { isLoggedIn } = state.login;

    return { isLoggedIn };
  });

  const redirectBack = () => {
    if (isLoggedIn) {
      return <Redirect to={Routes.Users} />;
    }

    history.goBack();

    return undefined;
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className={classes.root}>
          <main>{children}</main>
        </div>
      ) : (
        <>{redirectBack()}</>
      )}
    </>
  );
};

export default AuthLayout;
