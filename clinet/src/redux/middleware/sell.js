import { apiRequest } from '../actions/api';
import {
  CREATE_PRODUCT_START,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  setProduct,
  SELL_COMPLATE_START,
  SELL_COMPLATE_SUCCESS,
  SELL_COMPLATE_FAIL,
  GET_LAST_USER_START,
  GET_LAST_USER_SUCCESS,
  GET_LAST_USER_FAIL,
} from '../actions/sell';
import { setMessage, redirectTo, loadingFinish, clearUi } from '../actions/ui';
import { setUser } from '../actions/register';

export const createProductStart = ({ dispatch }) => next => action => {
  next(action);
  const URL = 'dashboard/createitem';
  if (action.type === CREATE_PRODUCT_START) {
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
    dispatch(setProduct(action.payload.product));
    dispatch(redirectTo('/dashboard/sell/formconfirm'));
    dispatch(clearUi());
  }
};
export const createProductFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === CREATE_PRODUCT_FAIL) {
    console.log(action);
    dispatch(setMessage(action.payload));
  }
};
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
    dispatch(clearUi());
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
    dispatch(loadingFinish());
  }
};

export const sellMdl = [
  createProductStart,
  createProductSuccess,
  createProductFail,
  sellComplateSuccess,
  sellComplateFail,
  getLastUserStart,
  getLastUserSuccess,
  getLastUserFail,
];
