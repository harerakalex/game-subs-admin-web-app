import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

// import { withdrawStyles } from './styles';
import DashboardLayout from '../Reusable/DashboardLayout';
import { getRequest, putRequest } from '../../redux/api';
import WithdrawTable from './Withdraw';
import Loader from '../Reusable/Loader';

const Withdraws: FC = () => {
  // const classes = withdrawStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [loading, setLoading] = useState(false);
  const [withdraw, setwithdraw] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    (async () => {
      await getwithdraw(0);
    })();
    // eslint-disable-next-line
  }, []);

  const getwithdraw = async (page: number, limit = rowsPerPage) => {
    try {
      setLoading(true);
      const withdraw = await getRequest(`/admin/withdraws?page=${page + 1}&limit=${limit}`);
      setTotalItems(withdraw.data.pageMeta.count);
      setwithdraw(withdraw.data.withdraws);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      setLoading(true);
      const result = await putRequest(`/withdraw/user/${id}/status/${newStatus}`, {});

      const newArray = withdraw.map(w => {
        if (w.id === id) {
          w.state = newStatus;
        }

        return w;
      });

      setwithdraw(newArray);

      toast.success(result.message);
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    getwithdraw(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    getwithdraw(0, parseInt(event.target.value, 10));
  };

  return (
    <DashboardLayout>
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            {withdraw.length && totalItems !== 0 ? (
              <WithdrawTable
                withdraw={withdraw}
                page={page}
                rowsPerPage={rowsPerPage}
                totalItems={totalItems as number}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                showPagination={true}
                handleUpdateStatus={handleUpdateStatus}
              />
            ) : (
              <h1>No Withdraws found</h1>
            )}
          </>
        )}
      </>
    </DashboardLayout>
  );
};

export default withRouter(Withdraws);
