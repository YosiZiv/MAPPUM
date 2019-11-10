import {
  USER_REGISTER_START,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  INPUT_HANDLE_MID,
  setInput,
} from '../actions/register';
import { apiRequest } from '../actions/api';
import { setMessage, redirectTo, deleteMessage } from '../actions/ui';
import { checkValidity } from '../../shared/utility';

const inputHandler = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === INPUT_HANDLE_MID) {
    const { id, value, validation } = action.payload;

    const isValid = checkValidity(value, validation);
    if (isValid) {
      dispatch(deleteMessage(id));
    }
    dispatch(setInput({ id, value, isValid }));
  }
};

const userRegisterStart = ({ dispatch }) => next => action => {
  next(action);
  const URL = 'user/';
  if (action.type === USER_REGISTER_START) {
    dispatch(
      apiRequest(
        'POST',
        URL,
        action.payload,
        USER_REGISTER_SUCCESS,
        USER_REGISTER_FAIL,
      ),
    );
  }
};
const userRegisterSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === USER_REGISTER_SUCCESS) {
    dispatch(redirectTo('login'));
  }
};
const userRegisterFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === USER_REGISTER_FAIL) {
    dispatch(setMessage(action.payload));
  }
};

//
//
//
export const registerhMdl = [
  inputHandler,
  userRegisterStart,
  userRegisterSuccess,
  userRegisterFail,
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
