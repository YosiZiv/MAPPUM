export const SET_MESSAGE = '[UI] Message';
export const REDIRECT = '[UI] Redirect';
export const CLEAR_UI = '[UI] Clear UI State';
export const LOADING_START = '[UI] Loading Start';
export const LOADING_FINISH = '[UI] Loading Finish';
export const setMessage = message => ({
  type: SET_MESSAGE,
  payload: message,
});
export const redirectTo = url => ({
  type: REDIRECT,
  payload: url,
});
export const clearLoginState = () => ({
  type: CLEAR_UI,
});
export const loadingStart = () => ({
  type: LOADING_START,
});
export const loadingFinish = () => ({
  type: LOADING_FINISH,
});
export const clearUi = () => ({
  type: CLEAR_UI,
});
