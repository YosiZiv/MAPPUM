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
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) dispatch(setAuth(true));
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
    dispatch(setAuth(true));
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
    localStorage.removeItem('jwtToken');
    dispatch(setAuth(false));
    dispatch(redirectTo('/'));
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
