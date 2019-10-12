import { SET_PRODUCT, SET_PRODUCT_FIELDS } from '../actions/sell';
import { checkValidity } from '../../shared/utility';
const initState = {
  productForm: {},
  product: null,
};

export function sellReducer(state = initState, action) {
  switch (action.type) {
    case SET_PRODUCT_FIELDS:
      return {
        ...state,
        productForm: {
          ...state.productForm,
          [action.payload.id]: {
            value: action.payload.value,
            isValid: checkValidity(
              action.payload.value,
              action.payload.validation,
            ),
          },
        },
      };
    case SET_PRODUCT:
      return { ...state, product: action.payload };
    default:
      return state;
  }
}
