import { applyMiddleware, createStore, compose } from 'redux';
import { reducers } from './reducers';
import { api } from './middleware/api';
import { authMdl } from './middleware/auth';
import { registerhMdl } from './middleware/register';
import { sellMdl } from './middleware/sell';
// dev tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(api, ...authMdl, ...registerhMdl, ...sellMdl),
  ),
);
