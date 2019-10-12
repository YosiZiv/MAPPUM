import { SET_PRODUCT } from '../actions/sell';
const initState = {
  product: null,
};

export function sellReducer(state = initState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return { ...state, product: action.payload };
    default:
      return state;
  }
}
