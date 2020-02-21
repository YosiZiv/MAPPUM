// export const SET_EMAILS = '[Register] Set Emails';
// export const SEARCH_USER_AUTO_COMPLETE = '[register] Search User Auto Complete';
// export const SET_USER = '[register] Set User';
export const SET_SEARCH_FIELDS = '[register] Set Search Fields';
// export const SWITCH_REGISTER_MODE = '[register] Switch Register Mode';
// export const GET_USER_USERS_START = '[register] Get User By Email Start';
// export const GET_USER_USERS_SUCCESS = '[register] Get User By Email Success';
// export const GET_USER_USERS_FAIL = '[register] Get User By Email Fail';
// export const GET_USER_BY_EMAIL_START = '[register] Get User By Email Start';
// export const GET_USER_BY_EMAIL_SUCCESS = '[register] Get User By Email Success';
// export const GET_USER_BY_EMAIL_FAIL = '[register] Get User By Email Fail';

export const CUSTOMER_INPUT_HANDLE_MID = '[customer] Set Input Mid';
export const CUSTOMER_SET_INPUT = '[customer] Set Input';
export const CUSTOMER_REGISTER_START = '[customer] Register Customer Start';
export const CUSTOMER_REGISTER_SUCCESS = '[customer] Register Customer Success';
export const CUSTOMER_REGISTER_FAIL = '[customer] Register Customer Fail';
export const RESET_CUSTOMER_STATE = '[customer] Reset Customer State';
export const GET_USER_CUSTOMERS = '[customer] get user customers';
export const inputHandle = payload => ({
  type: CUSTOMER_INPUT_HANDLE_MID,
  payload,
});

export const setInput = payload => ({
  type: CUSTOMER_SET_INPUT,
  payload,
});
export const customerRegisterStart = payload => ({
  type: CUSTOMER_REGISTER_START,
  payload,
});

export const resetRegisterState = () => ({
  type: RESET_CUSTOMER_STATE,
});
export const getUserCustomers = () => ({
  type: GET_USER_CUSTOMERS,
});

// export const getUserByEmail = payload => ({
//   type: GET_USER_USERS_START,
//   payload,
// });

// export const searchUserAutoComplete = payload => ({
//   type: SEARCH_USER_AUTO_COMPLETE,
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
