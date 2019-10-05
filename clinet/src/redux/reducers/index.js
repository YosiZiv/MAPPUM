import { uiReducer } from './ui';
import { authReducer } from './auth';
import { registerReducer } from './register';
import { productReducer } from './product';
import { combineReducers } from 'redux';
import { formSubmitReducer } from './formSubmit';
export const reducers = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  register: registerReducer,
  product: productReducer,
  formSubmit: formSubmitReducer,
});
