import { IUser } from './user';

export enum LoginTypes {
  LoginSuccess = 'LOGIN_SUCCESS',
  LoginLoading = 'LOGIN_LOADING',
  LoginError = 'LOGIN_ERROR',

  // Get Admin profile
  GetAdminProfileSuccess = 'GET_ADMIN_PROFILE_SUCCESS',
  GetAdminProfileLoading = 'GET_ADMIN_PROFILE_LOADING',
  GetAdminProfileError = 'GET_ADMIN_PROFILE_ERROR',

  ActivePath = 'ACTIVE_PATH'
}

export interface ILogin {
  email: string;
  password: string;
}

// Login
interface LoginSuccess {
  type: typeof LoginTypes.LoginSuccess;
  payload: {
    data: IUser;
  };
}

interface LoginError {
  type: typeof LoginTypes.LoginError;
  payload: {
    errors: any;
  };
}

interface LoginLoading {
  type: typeof LoginTypes.LoginLoading;
  payload: {
    loading: boolean;
  };
}

// Get admin profile
interface GetAdminProfileSuccess {
  type: typeof LoginTypes.GetAdminProfileSuccess;
  payload: {
    data: IUser;
  };
}

interface GetAdminProfileError {
  type: typeof LoginTypes.GetAdminProfileError;
  payload: {
    errors: any;
  };
}

interface GetAdminProfileLoading {
  type: typeof LoginTypes.GetAdminProfileLoading;
  payload: {
    loading: boolean;
  };
}

interface ActivePath {
  type: typeof LoginTypes.ActivePath;
  payload: {
    data: string;
  };
}

export type LoginActionTypes =
  | LoginLoading
  | LoginError
  | LoginSuccess
  | GetAdminProfileLoading
  | GetAdminProfileError
  | GetAdminProfileSuccess
  | ActivePath;
