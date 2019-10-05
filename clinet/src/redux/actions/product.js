export const CREATE_PRODUCT_START = '[product] Create Product Start';
export const CREATE_PRODUCT_SUCCESS = '[product] Create Product Success';
export const CREATE_PRODUCT_FAIL = '[product] Create Product Fail';
export const SET_PRODUCT = '[product] Set Product';
export const createProductStart = payload => ({
  type: CREATE_PRODUCT_START,
  payload,
});

export const setProduct = payload => ({
  type: SET_PRODUCT,
  payload,
});
// eslint-disable-next-line import/prefer-default-export
