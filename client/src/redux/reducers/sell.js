import {
  SET_PRODUCT,
  SET_PRODUCT_FIELDS,
  CHANGE_SELL_STAGE,
} from '../actions/sell';
import { checkValidity } from '../../shared/utility';
const initState = {
  productForm: {},
  product: null,
  stage: 'register',
};

export function sellReducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_SELL_STAGE:
      console.log(action);

      return { ...state, stage: action.payload };
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
