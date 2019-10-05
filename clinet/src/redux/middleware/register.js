import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SEARCH_USER_START,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAIL,
  setUser,
} from '../actions/register';
import { apiRequest } from '../actions/api';
import { setMessage, redirectTo, clearUi } from '../actions/ui';

export const registerStart = ({ dispatch }) => next => action => {
  next(action);
  const URL = 'dashboard/register';
  if (action.type === REGISTER_START) {
    dispatch(clearUi());
    dispatch(
      apiRequest('POST', URL, action.payload, REGISTER_SUCCESS, REGISTER_FAIL),
    );
  }
};
export const registerSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === REGISTER_SUCCESS) {
    dispatch(setUser(action.payload.user));
    dispatch(redirectTo('/dashboard/sell/createitem'));
  }
};

export const registerFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === REGISTER_FAIL) {
    dispatch(setMessage(action.payload));
  }
};
export const searchUserStart = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === SEARCH_USER_START) {
    const URL = 'dashboard/getuserbyemail';
    dispatch(
      apiRequest(
        'POST',
        URL,
        action.payload,
        SEARCH_USER_SUCCESS,
        SEARCH_USER_FAIL,
      ),
    );
  }
};
export const searchUserSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === SEARCH_USER_SUCCESS) {
    dispatch(setUser(action.payload.user));
    dispatch(clearUi());
    dispatch(redirectTo('/dashboard/sell/createItem'));
  }
};
export const searchUserFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === SEARCH_USER_FAIL) {
    console.log(action.payload);
    dispatch(setMessage(action.payload));
  }
};
export const registerhMdl = [
  registerStart,
  registerSuccess,
  registerFail,
  searchUserStart,
  searchUserSuccess,
  searchUserFail,
];
