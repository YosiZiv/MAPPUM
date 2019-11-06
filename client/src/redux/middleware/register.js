import {
  ADMIN_REGISTER_START,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_ADMIN_USERS_START,
  GET_ADMIN_USERS_SUCCESS,
  GET_ADMIN_USERS_FAIL,
  GET_USER_BY_EMAIL_START,
  GET_USER_BY_EMAIL_SUCCESS,
  GET_USER_BY_EMAIL_FAIL,
  ADMIN_SET_FIELD_MID,
  setUser,
  setEmails,
  setAdminRegisterFields,
} from '../actions/register';
import { changeSellStage } from '../actions/sell';
import { apiRequest } from '../actions/api';
import { setMessage, redirectTo, clearUi, deleteMessage } from '../actions/ui';
import { checkValidity } from '../../shared/utility';
export const adminSetFieldMid = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === ADMIN_SET_FIELD_MID) {
    const { id, value, validation } = action.payload;

    const isValid = checkValidity(value, validation);
    if (isValid) {
      dispatch(deleteMessage(id));
    }
    dispatch(setAdminRegisterFields({ id, value, isValid }));
  }
};

export const adminRegisterStart = ({ dispatch }) => next => action => {
  next(action);
  const URL = 'user/';
  if (action.type === ADMIN_REGISTER_START) {
    console.log(action.payload);

    dispatch(
      apiRequest(
        'POST',
        URL,
        action.payload,
        ADMIN_REGISTER_SUCCESS,
        ADMIN_REGISTER_FAIL,
      ),
    );
  }
};
export const adminRegisterSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === ADMIN_REGISTER_SUCCESS) {
    dispatch(redirectTo('login'));
  }
};

export const adminRegisterFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === ADMIN_REGISTER_FAIL) {
    dispatch(setMessage(action.payload));
  }
};

export const registerStart = ({ dispatch }) => next => action => {
  next(action);
  const URL = 'register/registeruser';
  if (action.type === REGISTER_START) {
    dispatch(
      apiRequest('POST', URL, action.payload, REGISTER_SUCCESS, REGISTER_FAIL),
    );
  }
};

export const registerSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === REGISTER_SUCCESS) {
    dispatch(setUser(action.payload.user));
    dispatch(changeSellStage('createProduct'));
    dispatch(redirectTo('/dashboard/sell/createproduct'));
    dispatch(clearUi());
  }
};

export const registerFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === REGISTER_FAIL) {
    dispatch(setMessage(action.payload));
  }
};
export const getAllAdminsUsersStart = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === GET_ADMIN_USERS_START) {
    const URL = 'dashboard/getadminsusers';
    dispatch(
      apiRequest(
        'GET',
        URL,
        null,
        GET_ADMIN_USERS_SUCCESS,
        GET_ADMIN_USERS_FAIL,
      ),
    );
  }
};
export const getAllAdminsUsersSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === GET_ADMIN_USERS_SUCCESS) {
    dispatch(setEmails(action.payload.emails));
  }
};
export const getAllAdminsUsersFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === GET_ADMIN_USERS_FAIL) {
    dispatch(setMessage(action.payload));
  }
};
export const getUserByEmailStart = ({ dispatch }) => next => action => {
  next(action);
  const URL = 'dashboard/getuserbyemail';
  if (action.type === GET_USER_BY_EMAIL_START) {
    dispatch(
      apiRequest(
        'POST',
        URL,
        action.payload,
        GET_USER_BY_EMAIL_SUCCESS,
        GET_USER_BY_EMAIL_FAIL,
      ),
    );
  }
};

export const getUserByEmailSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === GET_USER_BY_EMAIL_SUCCESS) {
    dispatch(setUser(action.payload.user));
    dispatch(changeSellStage('createProduct'));
    dispatch(redirectTo('/dashboard/sell/createproduct'));
    dispatch(clearUi());
  }
};

export const getUserByEmailFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === GET_USER_BY_EMAIL_FAIL) {
    dispatch(setMessage(action.payload));
  }
};
export const registerhMdl = [
  adminRegisterStart,
  adminRegisterSuccess,
  adminRegisterFail,
  registerStart,
  registerSuccess,
  registerFail,
  getAllAdminsUsersStart,
  getAllAdminsUsersSuccess,
  getAllAdminsUsersFail,
  getUserByEmailStart,
  getUserByEmailSuccess,
  getUserByEmailFail,
  adminSetFieldMid,
];
