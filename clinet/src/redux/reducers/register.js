import { SET_USER } from '../actions/register';

const initState = {
  user: null,
};

export function registerReducer(state = initState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
