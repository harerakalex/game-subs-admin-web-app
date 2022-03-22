import React, { FC } from 'react';

import { pageNotFoundStyles } from './styles';

const PageNotFound: FC = () => {
  const classes = pageNotFoundStyles();

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>404 Page Not Found</h1>
    </div>
  );
};

export default PageNotFound;
