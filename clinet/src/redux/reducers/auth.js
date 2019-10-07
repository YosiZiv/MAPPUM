import { LOGIN_ERROR, SET_LOGIN_FIELDS, SET_AUTH } from '../actions/auth';
const initState = {
  errors: null,
  token: null,
  loginForm: {},
  admin: false,
  user: false,
};

export function authReducer(state = initState, action) {
  switch (action.type) {
    case SET_LOGIN_FIELDS:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          [action.payload.id]: action.payload.value,
        },
      };
    case SET_AUTH:
      return {
        ...state,
        token: action.payload.token && action.payload.token,
        admin: action.payload.admin && action.payload.admin,
        user: action.payload.user && action.payload.user,
      };
    case LOGIN_ERROR:
      return { ...state, message: action.payload.errors };
    default:
      return state;
  }
}
