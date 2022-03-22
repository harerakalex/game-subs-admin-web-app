import { Dispatch } from 'redux';

import { LoginTypes, ILogin } from '../action-types/login';
import { ApiAction } from '../../utils';

export const loginAction = (userData: ILogin) => async (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      url: `/users/login`,
      method: 'POST',
      data: userData,
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: LoginTypes.LoginLoading,
          payload: { loading: true }
        });
      },
      onFailure: (error: any) => (dispatch: Dispatch) => {
        dispatch({
          type: LoginTypes.LoginError,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: (res: any) => (dispatch: Dispatch) => {
        dispatch({
          type: LoginTypes.LoginSuccess,
          payload: { data: res.data }
        });
      }
    })
  );
};

export const getAdminProfileAction = (username: string) => async (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      url: `/users/${username}`,
      method: 'GET',
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: LoginTypes.GetAdminProfileLoading,
          payload: { loading: true }
        });
      },
      onFailure: (error: any) => (dispatch: Dispatch) => {
        dispatch({
          type: LoginTypes.GetAdminProfileError,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: (res: any) => (dispatch: Dispatch) => {
        dispatch({
          type: LoginTypes.GetAdminProfileSuccess,
          payload: { data: res.data }
        });
      }
    })
  );
};
