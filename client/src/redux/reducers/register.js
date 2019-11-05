import {
  SET_USER,
  ADMIN_SET_REGISTER_FIELDS,
  SET_REGISTER_FIELDS,
  SWITCH_REGISTER_MODE,
  SET_SEARCH_FIELDS,
  SEARCH_USER_AUTO_COMPLETE,
  RESET_REGISTER_STATE,
  SET_EMAILS,
} from '../actions/register';
import { checkValidity } from '../../shared/utility';
const initState = {
  user: null,
  registerForm: {},
  adminRegisterForm: {},
  searchForm: {},
  emails: [],
  autoCompleteResult: [],
  mode: true,
};

export function registerReducer(state = initState, action) {
  switch (action.type) {
    case RESET_REGISTER_STATE:
      return {
        ...state,
        user: null,
        registerForm: {},
        searchForm: {},
        emails: [],
        autoCompleteResult: [],
        mode: true,
      };
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_EMAILS:
      return { ...state, emails: action.payload };
    case SEARCH_USER_AUTO_COMPLETE:
      const autoCompleteResult = [];
      if (state.emails.length) {
        state.emails.forEach(email => {
          if (email.includes(action.payload) && action.payload !== '') {
            autoCompleteResult.push(email);
          }
        });
      }
      return { ...state, autoCompleteResult };
    case ADMIN_SET_REGISTER_FIELDS:
      return {
        ...state,
        adminRegisterForm: {
          ...state.adminRegisterForm,
          [action.payload.id]: {
            value: action.payload.value,
            isValid: action.payload.isValid,
          },
        },
      };
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
