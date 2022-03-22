import React, { ChangeEvent, FC } from 'react';
import { MenuItem, TextField } from '@material-ui/core';

import { searchBoxStyles } from './styles';

type Props = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  options: Array<{
    value: string;
    label: string;
  }>;
  selectedOption: string;
};

const FilterBox: FC<Props> = props => {
  const { handleChange, options, selectedOption } = props;

  const classes = searchBoxStyles();

  return (
    <TextField
      id="outlined-select-currency"
      select
      label="Filter By:"
      value={selectedOption}
      onChange={handleChange}
      variant="outlined"
      className={classes.input}
    >
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FilterBox;
