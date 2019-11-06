import { LOGIN_ERROR, SET_LOGIN_FIELDS, SET_AUTH } from '../actions/auth';
import { checkValidity } from '../../shared/utility';
const initState = {
  errors: null,
  loginForm: {},
};

export function authReducer(state = initState, action) {
  switch (action.type) {
    case SET_LOGIN_FIELDS:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          [action.payload.id]: {
            value: action.payload.value,
            isValid: checkValidity(
              action.payload.value,
              action.payload.validation,
            ),
          },
        },
      };
    case LOGIN_ERROR:
      return { ...state, message: action.payload.errors };
    default:
      return state;
  }
}
