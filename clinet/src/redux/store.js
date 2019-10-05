import { applyMiddleware, createStore, compose } from 'redux';
import { reducers } from './reducers';
import { api } from './middleware/api';
import { authMdl } from './middleware/auth';
import { registerhMdl } from './middleware/register';
import { productMdl } from './middleware/product';
import { formSubmitMdl } from './middleware/formSubmit';
// dev tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      api,
      ...authMdl,
      ...registerhMdl,
      ...productMdl,
      ...formSubmitMdl,
    ),
  ),
);
