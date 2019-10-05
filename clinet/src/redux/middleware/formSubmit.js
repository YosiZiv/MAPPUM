import { apiRequest } from '../actions/api';
import {
  SELL_COMPLATE_START,
  SELL_COMPLATE_SUCCESS,
  SELL_COMPLATE_FAIL,
  GET_LAST_USER_START,
  GET_LAST_USER_SUCCESS,
  GET_LAST_USER_FAIL,
  GET_LAST_PRODUCT_START,
  GET_LAST_PRODUCT_SUCCESS,
  GET_LAST_PRODUCT_FAIL,
} from '../actions/formSubmit';
import { setMessage, redirectTo } from '../actions/ui';
import { setUser } from '../actions/register';
import { setProduct } from '../actions/product';

export const sellComplateStart = ({ dispatch }) => next => action => {
  next(action);
  const URL = 'dashboard/sellcomplate';
  if (action.type === SELL_COMPLATE_START) {
    dispatch(
      apiRequest(
        'POST',
        URL,
        action.payload,
        SELL_COMPLATE_SUCCESS,
        SELL_COMPLATE_FAIL,
      ),
    );
  }
};

export const sellComplateSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === SELL_COMPLATE_SUCCESS) {
    console.log(action);
    // dispatch(setProduct(action.payload.item));
    dispatch(redirectTo('/dashboard/sell/formconfirm'));
  }
};
export const sellComplateFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === SELL_COMPLATE_FAIL) {
    console.log(action);
    dispatch(setMessage(action.payload));
  }
};
export const getLastUserStart = ({ dispatch }) => next => action => {
  next(action);
  const URL = 'dashboard/getlastuser';
  if (action.type === GET_LAST_USER_START) {
    console.log(URL);
    dispatch(
      apiRequest('GET', URL, null, GET_LAST_USER_SUCCESS, GET_LAST_USER_FAIL),
    );
  }
};
export const getLastUserSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === GET_LAST_USER_SUCCESS) {
    console.log(action);
    // dispatch(setProduct(action.payload.item));
    dispatch(setUser(action.payload.user));
  }
};
export const getLastUserFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === GET_LAST_USER_FAIL) {
    console.log(action);
    dispatch(setMessage(action.payload));
  }
};
export const getLastProductStart = ({ dispatch }) => next => action => {
  next(action);
  const URL = 'dashboard/getlastproduct';
  if (action.type === GET_LAST_PRODUCT_START) {
    dispatch(
      apiRequest(
        'GET',
        URL,
        null,
        GET_LAST_PRODUCT_SUCCESS,
        GET_LAST_PRODUCT_FAIL,
      ),
    );
  }
};
export const getLastProductSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === GET_LAST_PRODUCT_SUCCESS) {
    console.log(action);
    dispatch(setProduct(action.payload.product));
  }
};
export const getLastProductFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === GET_LAST_PRODUCT_FAIL) {
    console.log(action);
    dispatch(setMessage(action.payload));
  }
};
export const formSubmitMdl = [
  sellComplateSuccess,
  sellComplateFail,
  getLastUserStart,
  getLastUserSuccess,
  getLastUserFail,
  getLastProductStart,
  getLastProductSuccess,
  getLastProductFail,
];
