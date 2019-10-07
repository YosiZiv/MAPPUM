import { SET_USER, SET_REGISTER_FIELDS } from '../actions/register';

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
          [action.payload.id]: action.payload.value,
        },
      };
    default:
      return state;
  }
}
