import React, { ChangeEvent, FC } from 'react';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip
} from '@material-ui/core';
import Moment from 'moment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

import { withdrawStyles } from '../styles';
import { IWithdraw } from '../../../redux/action-types/withdraw';

type Props = {
  withdraw: IWithdraw[];
  page: number;
  rowsPerPage: number;
  totalItems: number;
  showPagination: boolean;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
  handleUpdateStatus: (id: number, status: string) => void;
};
const UsersTable: FC<Props> = props => {
  const {
    withdraw,
    page,
    rowsPerPage,
    totalItems,
    showPagination,
    handleChangePage,
    handleChangeRowsPerPage,
    handleUpdateStatus
  } = props;
  const classes = withdrawStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow style={{ background: 'lightgray' }}>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">walletAddress</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Created</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {withdraw.map((withdraw, index) => (
            <TableRow hover key={index}>
              <TableCell>{withdraw.id}</TableCell>
              <TableCell>{withdraw.user.username}</TableCell>
              <TableCell align="center">{withdraw.amount}</TableCell>
              <TableCell align="center">{withdraw.walletAddress}</TableCell>
              <TableCell align="center">{withdraw.state}</TableCell>
              <TableCell align="center">
                {Moment(withdraw.createdAt).format('DD-MM-YYYY')}
              </TableCell>
              <TableCell align="center">
                <div className={classes.actions}>
                  <Tooltip title="Pending">
                    <span>
                      <IconButton
                        disabled={withdraw.state === 'pending'}
                        color="inherit"
                        aria-label="pending withdraw"
                        edge="start"
                        onClick={() => handleUpdateStatus(withdraw?.id as number, 'pending')}
                      >
                        <PauseCircleOutlineIcon
                          color={withdraw.state === 'pending' ? 'disabled' : 'primary'}
                        />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title={withdraw.state === 'paid' ? 'Paid' : 'Mark as paid'}>
                    <span>
                      <IconButton
                        disabled={withdraw.state === 'paid'}
                        color="inherit"
                        aria-label="paid withdraw"
                        edge="start"
                        onClick={() => handleUpdateStatus(withdraw?.id as number, 'paid')}
                      >
                        <CheckCircleIcon
                          style={{ color: withdraw.state === 'paid' ? 'green' : 'gray' }}
                        />
                      </IconButton>
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
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

export default UsersTable;
