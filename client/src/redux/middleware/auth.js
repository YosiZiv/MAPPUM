import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  AUTO_LOGIN,
  SET_AUTH_TIME,
  LOGOUT,
  setAuth,
  setAuthTime,
  logout,
} from '../actions/auth';
import { apiRequest } from '../actions/api';
import { setMessage, clearUi, redirectTo } from '../actions/ui';

export const autoLogin = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === AUTO_LOGIN) {
    const adminToken = localStorage.getItem('adminToken');
    const userToken = localStorage.getItem('userToken');
    const id = localStorage.getItem('id');
    if (!adminToken && !userToken) {
      return dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirseIn'));
      if (expirationDate <= new Date()) {
        return dispatch(logout());
      } else {
        const user = {
          admin: adminToken ? true : false,
          user: userToken ? true : false,
        };
        const updateDate =
          (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(setAuthTime(updateDate));
        dispatch(setAuth(user));
      }
    }
  }
};
export const loginStart = ({ dispatch }) => next => action => {
  next(action);
  const URL = 'auth/';
  if (action.type === LOGIN_START) {
    dispatch(
      apiRequest('POST', URL, action.payload, LOGIN_SUCCESS, LOGIN_ERROR),
    );
  }
};

export const loginSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === LOGIN_SUCCESS) {
    localStorage.setItem('jwtToken', action.payload.token);
    dispatch(redirectTo('/'));
  }
};
export const loginFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === LOGIN_ERROR) {
    dispatch(setMessage(action.payload));
  }
};

export const onLogout = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === LOGOUT) {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userToken');
    localStorage.removeItem('expirseIn');
    localStorage.removeItem('id');
    dispatch(setAuth(null));
  }
};

export const checkAuthTimeout = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === SET_AUTH_TIME) {
    setTimeout(() => {
      dispatch(logout());
    }, action.payload * 1000);
  }
};

export const authMdl = [
  loginStart,
  loginSuccess,
  loginFail,
  checkAuthTimeout,
  onLogout,
  autoLogin,
];
