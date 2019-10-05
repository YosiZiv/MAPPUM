import { LOGIN_ERROR, SET_AUTH } from '../actions/auth';

const initState = {
  token: null,
  admin: false,
  user: false,
};

export function authReducer(state = initState, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        token: action.payload.token ? action.payload.token : null,
        admin: action.payload.admin ? true : false,
        user: action.payload.user ? true : false,
      };
    case LOGIN_ERROR:
      return { ...state, message: action.payload.errors };
    default:
      return state;
  }
}
