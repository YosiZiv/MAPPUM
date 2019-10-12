import { SET_USER, SET_REGISTER_FIELDS } from '../actions/register';
import { checkValidity } from '../../shared/utility';
const initState = {
  user: null,
  registerForm: {},
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
    default:
      return state;
  }
}
