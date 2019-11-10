import { CUSTOMER_SET_INPUT, RESET_CUSTOMER_STATE } from '../actions/customer';
import { checkValidity } from '../../shared/utility';
const initState = {
  customerForm: {},
  customer: null,
};

export function customerReducer(state = initState, action) {
  switch (action.type) {
    case RESET_CUSTOMER_STATE:
      return {
        ...state,
        customerForm: {},
        customer: null,
      };
    case CUSTOMER_SET_INPUT:
      return {
        ...state,
        customerForm: {
          ...state.customerForm,
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
// case SET_SEARCH_FIELDS:
//   return {
//     ...state,
//     searchForm: {
//       ...state.searchForm,
//       [action.payload.id]: {
//         value: action.payload.value,
//         isValid: checkValidity(
//           action.payload.value,
//           action.payload.validation,
//         ),
//       },
//     },
// case SET_USER:
//   return { ...state, user: action.payload };
// case SET_EMAILS:
//   return { ...state, emails: action.payload };
// case SEARCH_USER_AUTO_COMPLETE:
//   const autoCompleteResult = [];
//   if (state.emails.length) {
//     state.emails.forEach(email => {
//       if (email.includes(action.payload) && action.payload !== '') {
//         autoCompleteResult.push(email);
//       }
//     });
//   }
//   return { ...state, autoCompleteResult };
// case SWITCH_REGISTER_MODE:
//   return { ...state, mode: !state.mode };
