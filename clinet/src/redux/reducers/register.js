import {
  SET_USER,
  SET_REGISTER_FIELDS,
  SWITCH_REGISTER_MODE,
  SET_SEARCH_FIELDS,
  SEARCH_USER_AUTO_COMPLATE,
  SET_EMAILS,
} from '../actions/register';
import { checkValidity } from '../../shared/utility';
const initState = {
  user: null,
  registerForm: {},
  searchForm: {},
  emails: [],
  autoComplateResult: [],
  mode: true,
};

export function registerReducer(state = initState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_EMAILS:
      return { ...state, emails: action.payload };
    case SEARCH_USER_AUTO_COMPLATE:
      const autoComplateResult = [];
      if (state.emails.length) {
        state.emails.forEach(email => {
          console.log(email);
          if (email.includes(action.payload)) {
            autoComplateResult.push(email);
          }
        });
      }
      return { ...state, autoComplateResult };
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
    case SET_SEARCH_FIELDS:
      return {
        ...state,
        searchForm: {
          ...state.searchForm,
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
