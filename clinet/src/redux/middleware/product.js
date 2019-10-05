import { apiRequest } from '../actions/api';
import {
  CREATE_PRODUCT_START,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  setProduct,
} from '../actions/product';
import { setMessage, redirectTo, clearUi } from '../actions/ui';

export const createProductStart = ({ dispatch }) => next => action => {
  next(action);
  const URL = 'dashboard/createitem';
  if (action.type === CREATE_PRODUCT_START) {
    dispatch(clearUi());
    dispatch(
      apiRequest(
        'POST',
        URL,
        action.payload,
        CREATE_PRODUCT_SUCCESS,
        CREATE_PRODUCT_FAIL,
      ),
    );
  }
};
export const createProductSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === CREATE_PRODUCT_SUCCESS) {
    console.log(action);
    dispatch(setProduct(action.payload.product));
    dispatch(redirectTo('/dashboard/sell/formconfirm'));
  }
};
export const createProductFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === CREATE_PRODUCT_FAIL) {
    console.log(action);
    dispatch(setMessage(action.payload));
  }
};

export const productMdl = [
  createProductStart,
  createProductSuccess,
  createProductFail,
];
