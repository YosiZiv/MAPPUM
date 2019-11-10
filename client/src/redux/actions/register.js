export const RESET_REGISTER_STATE = '[register] Register Reset State';
export const USER_REGISTER_START = '[register] USER Register Start';
export const USER_REGISTER_SUCCESS = '[register] USER Register Success';
export const USER_REGISTER_FAIL = '[register] USER Register Fail';
export const SET_INPUT = '[register] Set Input Fields';

export const INPUT_HANDLE_MID = '[Register] Input Handle Mid';

export const inputHandle = payload => ({
  type: INPUT_HANDLE_MID,
  payload,
});

export const setInput = payload => ({
  type: SET_INPUT,
  payload,
});

export const userRegisterStart = payload => ({
  type: USER_REGISTER_START,
  payload,
});
//
export const resetRegisterState = () => ({
  type: RESET_REGISTER_STATE,
});
