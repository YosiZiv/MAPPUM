export const CHANGE_SELL_STAGE = '[product] Change Sale Stage';
export const CREATE_PRODUCT_START = '[product] Create Product Start';
export const CREATE_PRODUCT_SUCCESS = '[product] Create Product Success';
export const CREATE_PRODUCT_FAIL = '[product] Create Product Fail';
export const SET_PRODUCT = '[product] Set Product';
export const FORM_SUBMIT_START = '[product] Form Submit Start';
export const FORM_SUBMIT_SUCCESS = '[product] Form Submit Success';
export const FORM_SUBMIT_FAIL = '[product] Form Submit Fail';
export const GET_LAST_USER_START = 'GET_LAST_USER_START';
export const GET_LAST_USER_SUCCESS = 'GET_LAST_USER_SUCCESS';
export const GET_LAST_USER_FAIL = 'GET_LAST_USER_FAIL';
export const SET_PRODUCT_FIELDS = '[sell] Set Product Fields';

export const changeSellStage = payload => ({
  type: CHANGE_SELL_STAGE,
  payload,
});
export const setProductFields = payload => ({
  type: SET_PRODUCT_FIELDS,
  payload,
});
export const formSubmitStart = payload => ({
  type: FORM_SUBMIT_START,
  payload,
});

export const getLastUser = () => ({
  type: GET_LAST_USER_START,
});

export const createProductStart = payload => ({
  type: CREATE_PRODUCT_START,
  payload,
});

export const setProduct = payload => ({
  type: SET_PRODUCT,
  payload,
});
// eslint-disable-next-line import/prefer-default-export
