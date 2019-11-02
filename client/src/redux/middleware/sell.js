import { apiRequest } from '../actions/api';
import {
  CREATE_PRODUCT_START,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  setProduct,
  FORM_SUBMIT_START,
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_FAIL,
} from '../actions/sell';
import { changeSellStage } from '../actions/sell';
import { setMessage, redirectTo, clearUi } from '../actions/ui';

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
    dispatch(changeSellStage('submit'));
    dispatch(redirectTo('/dashboard/sell/formconfirm'));
    dispatch(clearUi());
  }
};
export const createProductFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === CREATE_PRODUCT_FAIL) {
    dispatch(setMessage(action.payload));
  }
};
export const formSubmitStart = ({ dispatch }) => next => action => {
  next(action);
  const URL = 'dashboard/sellcomplate';
  if (action.type === FORM_SUBMIT_START) {
    dispatch(
      apiRequest(
        'POST',
        URL,
        action.payload,
        FORM_SUBMIT_SUCCESS,
        FORM_SUBMIT_FAIL,
      ),
    );
  }
};

export const formSubmitSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === FORM_SUBMIT_SUCCESS) {
    // dispatch(setProduct(action.payload.item));
    dispatch(redirectTo('/dashboard/sell/formsuccess'));
    dispatch(clearUi());
  }
};
export const formSubmitFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === FORM_SUBMIT_FAIL) {
    dispatch(setMessage(action.payload));
  }
};

export const sellMdl = [
  createProductStart,
  createProductSuccess,
  createProductFail,
  formSubmitStart,
  formSubmitSuccess,
  formSubmitFail,
];
