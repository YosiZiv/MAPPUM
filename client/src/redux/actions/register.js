export const RESET_REGISTER_STATE = '[register] Register Reset State';
export const ADMIN_REGISTER_START = '[register] Admin Register Start';
export const ADMIN_REGISTER_SUCCESS = '[register] Admin Register Success';
export const ADMIN_REGISTER_FAIL = '[register] Admin Register Fail';
export const REGISTER_START = '[register] Register Start';
export const REGISTER_SUCCESS = '[register] Register Success';
export const REGISTER_FAIL = '[register] Register Fail';
export const SET_USER = '[register] Set User';
export const SET_EMAILS = '[Register] Set Emails';
export const SEARCH_USER_AUTO_COMPLATE = '[register] Search User Auto Complate';
export const SET_REGISTER_FIELDS = '[register] Set Register Fields';
export const SET_SEARCH_FIELDS = '[register] Set Search Fields';
export const SWITCH_REGISTER_MODE = '[register] Switch Register Mode';
export const GET_ADMIN_USERS_START = '[register] Get User By Email Start';
export const GET_ADMIN_USERS_SUCCESS = '[register] Get User By Email Success';
export const GET_ADMIN_USERS_FAIL = '[register] Get User By Email Fail';
export const GET_USER_BY_EMAIL_START = '[register] Get User By Email Start';
export const GET_USER_BY_EMAIL_SUCCESS = '[register] Get User By Email Success';
export const GET_USER_BY_EMAIL_FAIL = '[register] Get User By Email Fail';
export const ADMIN_SET_REGISTER_FIELDS = '[register] Set Admin Register Fields';

export const setAdminRegisterFields = payload => ({
  type: ADMIN_SET_REGISTER_FIELDS,
  payload,
});
export const getUserByEmail = payload => ({
  type: GET_ADMIN_USERS_START,
  payload,
});

export const searchUserAutoComplate = payload => ({
  type: SEARCH_USER_AUTO_COMPLATE,
  payload,
});
export const setRegisterFields = payload => ({
  type: SET_REGISTER_FIELDS,
  payload,
});
export const setSearchFields = payload => ({
  type: SET_SEARCH_FIELDS,
  payload,
});
export const adminRegisterStart = payload => ({
  type: ADMIN_REGISTER_START,
  payload,
});
export const registerStart = payload => ({
  type: REGISTER_START,
  payload,
});
export const setUser = payload => ({
  type: SET_USER,
  payload,
});
export const getAdminsUsers = payload => ({
  type: GET_ADMIN_USERS_START,
  payload,
});
export const switchRegisterMode = () => ({
  type: SWITCH_REGISTER_MODE,
});
export const setEmails = payload => ({
  type: SET_EMAILS,
  payload,
});
export const resetRegisterState = () => ({
  type: RESET_REGISTER_STATE,
});
