import React, { ChangeEvent, FC } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import Moment from 'moment';

import { usersStyles } from '../styles';
import { IUser } from '../../../redux/action-types/user';

type Props = {
  users: IUser[];
  page: number;
  rowsPerPage: number;
  totalItems: number;
  showPagination: boolean;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
};
const ShopsTable: FC<Props> = props => {
  const {
    users,
    page,
    rowsPerPage,
    totalItems,
    showPagination,
    handleChangePage,
    handleChangeRowsPerPage
  } = props;
  const classes = usersStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First name</TableCell>
            <TableCell align="center">Last name</TableCell>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Subscription</TableCell>
            <TableCell align="center">Balance</TableCell>
            <TableCell align="center">Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow hover key={index}>
              <TableCell component="th" scope="row">
                {user.firstName}
              </TableCell>
              <TableCell align="center">{user.lastName}</TableCell>
              <TableCell align="center">{user.username}</TableCell>
              <TableCell align="center">{user.subscription}</TableCell>
              <TableCell align="center">{user.balance}</TableCell>
              <TableCell align="center">{Moment(user.createdAt).format('DD-MM-YYYY')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showPagination && (
        <TablePagination
          rowsPerPageOptions={[8, 15, 25]}
          component="div"
          count={totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </TableContainer>
  );
};

export default ShopsTable;
