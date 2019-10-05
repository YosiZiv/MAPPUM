export const SELL_COMPLATE_START = 'SELL_COMPLATE_START';
export const SELL_COMPLATE_SUCCESS = 'SELL_COMPLATE_SUCCESS';
export const SELL_COMPLATE_FAIL = 'SELL_COMPLATE_FAIL';
export const GET_LAST_PRODUCT_START = 'GET_LAST_PRODUCT_START';
export const GET_LAST_PRODUCT_SUCCESS = 'GET_LAST_PRODUCT_SUCCESS';
export const GET_LAST_PRODUCT_FAIL = 'GET_LAST_PRODUCT_FAIL';
export const GET_LAST_USER_START = 'GET_LAST_USER_START';
export const GET_LAST_USER_SUCCESS = 'GET_LAST_USER_SUCCESS';
export const GET_LAST_USER_FAIL = 'GET_LAST_USER_FAIL';

export const formSubmitStart = payload => ({
  type: SELL_COMPLATE_START,
  payload,
});
export const getLastProduct = () => ({
  type: GET_LAST_PRODUCT_START,
});
export const getLastUser = () => ({
  type: GET_LAST_USER_START,
});
