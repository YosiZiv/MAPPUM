import { combineReducers } from 'redux';
import { uiReducer } from './ui';
import { authReducer } from './auth';
import { registerReducer } from './register';
import { sellReducer } from './sell';
import { fileReducer } from './file';
import { customerReducer } from './customer';
export const reducers = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  register: registerReducer,
  sell: sellReducer,
  file: fileReducer,
  customer: customerReducer,
});
