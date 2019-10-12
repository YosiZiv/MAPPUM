export const CREATE_PRODUCT_START = '[product] Create Product Start';
export const CREATE_PRODUCT_SUCCESS = '[product] Create Product Success';
export const CREATE_PRODUCT_FAIL = '[product] Create Product Fail';
export const SET_PRODUCT = '[product] Set Product';
export const SELL_COMPLATE_START = 'SELL_COMPLATE_START';
export const SELL_COMPLATE_SUCCESS = 'SELL_COMPLATE_SUCCESS';
export const SELL_COMPLATE_FAIL = 'SELL_COMPLATE_FAIL';
export const GET_LAST_USER_START = 'GET_LAST_USER_START';
export const GET_LAST_USER_SUCCESS = 'GET_LAST_USER_SUCCESS';
export const GET_LAST_USER_FAIL = 'GET_LAST_USER_FAIL';

export const formSubmitStart = payload => ({
  type: SELL_COMPLATE_START,
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
