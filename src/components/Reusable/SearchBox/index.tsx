import React, { ChangeEvent, FC } from 'react';
import { IconButton, InputBase, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { searchBoxStyles } from './styles';

type Props = {
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: FC<Props> = props => {
  const { onSearchChange } = props;

  const classes = searchBoxStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        onChange={onSearchChange}
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
