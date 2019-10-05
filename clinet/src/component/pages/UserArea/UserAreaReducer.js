import * as actionTypes from'./loginActionTypes';
import { updateObject } from '../../../shared/utility';

const initialState = {
  errors: null,
  redirect: false
};

const loginStart = state => {
  return updateObject(state, { errors: null });
};
const loginSuccess = (state, action) => {
  return updateObject(state, {
    isAdmin: action.isAdmin,
    errors: null,
    redirect: true
  });
};

const loginFail = (state, action) => {
  return updateObject(state, {
    errors: action.errors
  });
};
const authLogout = state => {
  return updateObject(state, {
    redirect: true
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return loginStart(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL:
      return loginFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};
export default reducer;
