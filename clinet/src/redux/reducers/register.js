import {
  SET_USER,
  SET_REGISTER_FIELDS,
  SWITCH_REGISTER_MODE,
} from '../actions/register';
import { checkValidity } from '../../shared/utility';
const initState = {
  user: null,
  registerForm: {},
  mode: true,
};

export function registerReducer(state = initState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_REGISTER_FIELDS:
      return {
        ...state,
        registerForm: {
          ...state.registerForm,
          [action.payload.id]: {
            value: action.payload.value,
            isValid: checkValidity(
              action.payload.value,
              action.payload.validation,
            ),
          },
        },
      };
    case SWITCH_REGISTER_MODE:
      return { ...state, mode: !state.mode };
    default:
      return state;
  }
}
