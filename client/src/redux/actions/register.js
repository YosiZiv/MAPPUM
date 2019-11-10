export const RESET_REGISTER_STATE = '[register] Register Reset State';
export const USER_REGISTER_START = '[register] USER Register Start';
export const USER_REGISTER_SUCCESS = '[register] USER Register Success';
export const USER_REGISTER_FAIL = '[register] USER Register Fail';
export const SET_INPUT = '[register] Set Input Fields';

export const INPUT_HANDLE_MID = '[Register] Input Handle Mid';

export const inputHandle = payload => ({
  type: INPUT_HANDLE_MID,
  payload,
});

export const setInput = payload => ({
  type: SET_INPUT,
  payload,
});

export const userRegisterStart = payload => ({
  type: USER_REGISTER_START,
  payload,
});
//
export const resetRegisterState = () => ({
  type: RESET_REGISTER_STATE,
});

// export const SET_EMAILS = '[Register] Set Emails';
// export const SEARCH_USER_AUTO_COMPLETE = '[register] Search User Auto Complete';
// export const SET_USER = '[register] Set User';
// export const SET_SEARCH_FIELDS = '[register] Set Search Fields';
// export const SWITCH_REGISTER_MODE = '[register] Switch Register Mode';
// export const GET_USER_USERS_START = '[register] Get User By Email Start';
// export const GET_USER_USERS_SUCCESS = '[register] Get User By Email Success';
// export const GET_USER_USERS_FAIL = '[register] Get User By Email Fail';
// export const GET_USER_BY_EMAIL_START = '[register] Get User By Email Start';
// export const GET_USER_BY_EMAIL_SUCCESS = '[register] Get User By Email Success';
// export const GET_USER_BY_EMAIL_FAIL = '[register] Get User By Email Fail';

// export const USER_SET_REGISTER_FIELDS = '[register] Set USER Register Fields';
// export const CUSTOMER_REGISTER_START = '[register] Register Customer Start';
// export const CUSTOMER_REGISTER_SUCCESS = '[register] Register Customer Success';
// export const CUSTOMER_REGISTER_FAIL = '[register] Register Customer Fail';
// export const setSearchFields = payload => ({
//   type: SET_SEARCH_FIELDS,
//   payload,
// });
// export const setUserRegisterFields = payload => ({
//   type: USER_SET_REGISTER_FIELDS,
//   payload,
// });

// export const getUserByEmail = payload => ({
//   type: GET_USER_USERS_START,
//   payload,
// });

// export const searchUserAutoComplete = payload => ({
//   type: SEARCH_USER_AUTO_COMPLETE,
//   payload,
// });

// export const registerCustomerStart = payload => ({
//   type: CUSTOMER_REGISTER_START,
//   payload,
// });
// export const setUser = payload => ({
//   type: SET_USER,
//   payload,
// });
// export const getUSERsUsers = payload => ({
//   type: GET_USER_USERS_START,
//   payload,
// });
// export const switchRegisterMode = () => ({
//   type: SWITCH_REGISTER_MODE,
// });
// export const setEmails = payload => ({
//   type: SET_EMAILS,
//   payload,
// });
