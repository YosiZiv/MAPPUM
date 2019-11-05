import {
  SET_MESSAGE,
  DELETE_MESSAGE,
  REDIRECT,
  CLEAR_UI,
  LOADING_START,
  LOADING_FINISH,
} from '../actions/ui';
const initState = {
  message: null,
  redirect: null,
  loading: false,
};

export function uiReducer(state = initState, action) {
  switch (action.type) {
    case REDIRECT:
      return { ...state, redirect: action.payload };
    case SET_MESSAGE:
      return { ...state, message: action.payload };
    case DELETE_MESSAGE:
      const getMessage = this.state.message;
      const message = delete getMessage[action.payload];
      return { ...state, message };
    case CLEAR_UI:
      return { ...state, message: null, redirect: null };
    case LOADING_START:
      return { ...state, loading: true };
    case LOADING_FINISH:
      return { ...state, loading: false };
    default:
      return state;
  }
}
