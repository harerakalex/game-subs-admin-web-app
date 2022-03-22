import React, { FC } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { loaderStyles } from './styles';

const Loader: FC = () => {
  const classes = loaderStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
