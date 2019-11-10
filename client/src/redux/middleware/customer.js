import {
  CUSTOMER_INPUT_HANDLE_MID,
  CUSTOMER_REGISTER_START,
  CUSTOMER_REGISTER_SUCCESS,
  CUSTOMER_REGISTER_FAIL,
  setInput,
} from '../actions/customer';
import { apiRequest } from '../actions/api';
import { setMessage, redirectTo, deleteMessage } from '../actions/ui';
import { checkValidity } from '../../shared/utility';

const inputHandler = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === CUSTOMER_INPUT_HANDLE_MID) {
    const { id, value, validation, message } = action.payload;

    const isValid = checkValidity(value, validation);
    if (isValid && message[id]) {
      dispatch(deleteMessage(id));
    }
    dispatch(setInput({ id, value, isValid }));
  }
};

const customerRegisterStart = ({ dispatch }) => next => action => {
  next(action);
  const URL = 'user/';
  if (action.type === CUSTOMER_REGISTER_START) {
    dispatch(
      apiRequest(
        'POST',
        URL,
        action.payload,
        CUSTOMER_REGISTER_SUCCESS,
        CUSTOMER_REGISTER_FAIL,
      ),
    );
  }
};
const customerRegisterSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === CUSTOMER_REGISTER_SUCCESS) {
    dispatch(redirectTo('login'));
  }
};
const customerRegisterFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === CUSTOMER_REGISTER_FAIL) {
    dispatch(setMessage(action.payload));
  }
};

export const customerMid = [
  inputHandler,
  customerRegisterStart,
  customerRegisterSuccess,
  customerRegisterFail,
];

// export const registerStart = ({ dispatch }) => next => action => {
//   next(action);
//   const URL = 'register/registeruser';
//   if (action.type === REGISTER_START) {
//     dispatch(
//       apiRequest('POST', URL, action.payload, REGISTER_SUCCESS, REGISTER_FAIL),
//     );
//   }
// };

// export const registerSuccess = ({ dispatch }) => next => action => {
//   next(action);
//   if (action.type === REGISTER_SUCCESS) {
//     dispatch(setUser(action.payload.user));
//     dispatch(changeSellStage('createProduct'));
//     dispatch(redirectTo('/dashboard/sell/createproduct'));
//     dispatch(clearUi());
//   }
// };

// export const registerFail = ({ dispatch }) => next => action => {
//   next(action);
//   if (action.type === REGISTER_FAIL) {
//     dispatch(setMessage(action.payload));
//   }
// };

// export const getAllAdminsUsersStart = ({ dispatch }) => next => action => {
//   next(action);
//   if (action.type === GET_ADMIN_USERS_START) {
//     const URL = 'dashboard/getadminsusers';
//     dispatch(
//       apiRequest(
//         'GET',
//         URL,
//         null,
//         GET_ADMIN_USERS_SUCCESS,
//         GET_ADMIN_USERS_FAIL,
//       ),
//     );
//   }
// };
// export const getAllAdminsUsersSuccess = ({ dispatch }) => next => action => {
//   next(action);
//   if (action.type === GET_ADMIN_USERS_SUCCESS) {
//     dispatch(setEmails(action.payload.emails));
//   }
// };
// export const getAllAdminsUsersFail = ({ dispatch }) => next => action => {
//   next(action);
//   if (action.type === GET_ADMIN_USERS_FAIL) {
//     dispatch(setMessage(action.payload));
//   }
// };

// export const getUserByEmailStart = ({ dispatch }) => next => action => {
//   next(action);
//   const URL = 'dashboard/getuserbyemail';
//   if (action.type === GET_USER_BY_EMAIL_START) {
//     dispatch(
//       apiRequest(
//         'POST',
//         URL,
//         action.payload,
//         GET_USER_BY_EMAIL_SUCCESS,
//         GET_USER_BY_EMAIL_FAIL,
//       ),
//     );
//   }
// };

// export const getUserByEmailSuccess = ({ dispatch }) => next => action => {
//   next(action);
//   if (action.type === GET_USER_BY_EMAIL_SUCCESS) {
//     dispatch(setUser(action.payload.user));
//     dispatch(changeSellStage('createProduct'));
//     dispatch(redirectTo('/dashboard/sell/createproduct'));
//     dispatch(clearUi());
//   }
// };

// export const getUserByEmailFail = ({ dispatch }) => next => action => {
//   next(action);
//   if (action.type === GET_USER_BY_EMAIL_FAIL) {
//     dispatch(setMessage(action.payload));
//   }
// };
