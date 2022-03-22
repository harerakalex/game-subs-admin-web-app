import { LoginTypes, LoginActionTypes } from '../action-types/login';
import { IUser } from '../action-types/user';

interface InitialState {
  isLoggedIn: boolean;
  user?: IUser;
  loginLoading: boolean;
  loginErrors?: any;
  getProfileLoading: boolean;
  getProfileErrors?: any;
  activePath: string;
}

const initialState: InitialState = {
  loginLoading: false,
  isLoggedIn: !!localStorage.getItem('token'),
  getProfileLoading: false,
  activePath: '/users'
};

export const loginReducer = (state = initialState, action: LoginActionTypes) => {
  switch (action.type) {
    case LoginTypes.LoginLoading:
      return { ...state, loginLoading: action.payload.loading };

    case LoginTypes.LoginSuccess:
      return {
        ...state,
        user: action.payload.data,
        loginLoading: false,
        isLoggedIn: true
      };

    case LoginTypes.LoginError:
      return { ...state, loginErrors: action.payload.errors, loginLoading: false };

    // Admin Profile
    case LoginTypes.GetAdminProfileLoading:
      return { ...state, getProfileLoading: action.payload.loading };

    case LoginTypes.GetAdminProfileSuccess:
      const token = localStorage.getItem('token') as string;

      return {
        ...state,
        user: { ...action.payload.data, token },
        getProfileLoading: false
      };

    case LoginTypes.GetAdminProfileError:
      return { ...state, getProfileErrors: action.payload.errors, getProfileLoading: false };

    case LoginTypes.ActivePath:
      return { ...state, activePath: action.payload.data };

    default:
      return state;
  }
};
