import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

// import { usersStyles } from './styles';
import DashboardLayout from '../Reusable/DashboardLayout';
import { getRequest } from '../../redux/api';
import UsersTable from './UsersTable';
import Loader from '../Reusable/Loader';

const Users: FC = () => {
  // const classes = usersStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    (async () => {
      await getUsers(0);
    })();
    // eslint-disable-next-line
  }, []);

  const getUsers = async (page: number, limit = rowsPerPage) => {
    try {
      setLoading(true);
      const users = await getRequest(`/admin/users?page=${page + 1}&limit=${limit}`);
      setTotalItems(users.data.pageMeta.count);
      setUsers(users.data.users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    getUsers(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    getUsers(0, parseInt(event.target.value, 10));
  };

  return (
    <DashboardLayout>
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            {users.length && totalItems !== 0 ? (
              <UsersTable
                users={users}
                page={page}
                rowsPerPage={rowsPerPage}
                totalItems={totalItems as number}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                showPagination={true}
              />
            ) : (
              <h1>No Users found</h1>
            )}
          </>
        )}
      </>
    </DashboardLayout>
  );
};

export default withRouter(Users);
