export const REGISTER_START = '[register] Register Start';
export const REGISTER_SUCCESS = '[register] Register Success';
export const REGISTER_FAIL = '[register] Register Fail';
export const SET_USER = '[register] Set User';
export const SEARCH_USER_START = '[register] Search User Start';
export const SEARCH_USER_SUCCESS = '[register] Search User Success';
export const SEARCH_USER_FAIL = '[register] Search User Fail';
export const SET_REGISTER_FIELDS = '[register] Set Register Fields';

export const setRegisterFields = payload => ({
  type: SET_REGISTER_FIELDS,
  payload,
});

export const registerStart = payload => {
  return {
    type: REGISTER_START,
    payload,
  };
};
export const registerSuccess = (user, message) => {
  return {
    type: REGISTER_SUCCESS,
    user,
    message,
  };
};
export const registerFail = errors => {
  return {
    type: REGISTER_FAIL,
    errors,
  };
};
export const setUser = payload => {
  return {
    type: SET_USER,
    payload,
  };
};
export const searchUser = payload => ({
  type: SEARCH_USER_START,
  payload,
});
