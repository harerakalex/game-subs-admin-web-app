import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Routes } from '../../utils/routes';
import AuthLayout from '../Reusable/AuthLayout';
import NotFound from '../Reusable/PageNotFound';
import Layout from '../Reusable/Layout';
import Login from '../Login';
import Users from '../Users';

const AppRouter: FC = () => {
  const unAuthorizedRoutes = [
    { path: Routes.Home, exact: true, component: <Login /> },
    { path: Routes.Login, exact: true, component: <Login /> }
  ];

  const authorizedRoutes = [{ path: Routes.Users, exact: true, component: <Users /> }];

  return (
    <Router>
      <Switch>
        {unAuthorizedRoutes.map((route, index) => (
          <Route path={route.path} exact={route.exact} key={index}>
            <AuthLayout>{route.component}</AuthLayout>
          </Route>
        ))}
        {authorizedRoutes.map((route, index) => (
          <Route path={route.path} exact={route.exact} key={index}>
            <Layout>{route.component}</Layout>
          </Route>
        ))}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
