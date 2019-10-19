export const REGISTER_START = '[register] Register Start';
export const REGISTER_SUCCESS = '[register] Register Success';
export const REGISTER_FAIL = '[register] Register Fail';
export const SET_USER = '[register] Set User';
export const GET_ALL_EMAILS_START = '[Register] Get All Users Emails Start';
export const GET_ALL_EMAILS_SUCCESS = '[Register] Get All Users Emails Success';
export const GET_ALL_EMAILS_FAIL = '[Register] Get All Users Emails Fail';
export const SET_EMAILS = '[Register] Set Emails';
export const SEARCH_USER_AUTO_COMPLATE = '[register] Search User Auto Complate';
export const SET_REGISTER_FIELDS = '[register] Set Register Fields';
export const SET_SEARCH_FIELDS = '[register] Set Search Fields';
export const SWITCH_REGISTER_MODE = '[register] Switch Register Mode';
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
export const registerStart = payload => ({
  type: REGISTER_START,
  payload,
});
export const registerSuccess = (user, message) => ({
  type: REGISTER_SUCCESS,
  user,
  message,
});
export const registerFail = errors => ({
  type: REGISTER_FAIL,
  errors,
});
export const setUser = payload => ({
  type: SET_USER,
  payload,
});
export const getAllEmailsStart = () => ({
  type: GET_ALL_EMAILS_START,
});
export const getAllEmailsSuccess = () => ({
  type: GET_ALL_EMAILS_SUCCESS,
});
export const getAllEmailsFail = () => ({
  type: GET_ALL_EMAILS_FAIL,
});
export const switchRegisterMode = () => ({
  type: SWITCH_REGISTER_MODE,
});
export const setEmails = payload => ({
  type: SET_EMAILS,
  payload,
});
