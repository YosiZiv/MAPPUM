import { SET_PRODUCT } from '../actions/product';
const initState = {
  product: null,
};

export function productReducer(state = initState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return { ...state, product: action.payload };
    default:
      return state;
  }
}
