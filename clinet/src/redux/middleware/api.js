import { API_REQUEST } from '../actions/api';
import { loadingStart, loadingFinish } from '../actions/ui';
import axiosFunction from '../../axiosApi';
// this middleware care only for API calls
export const api = ({ dispatch }) => next => action => {
  console.log();

  const axios = axiosFunction();
  if (action.type === API_REQUEST) {
    dispatch(loadingStart());
    const { method, url, onSuccess, onError } = action.meta;
    console.log(action.url);

    if (method === 'GET') {
      axios
        .get(url)
        .then(response => {
          dispatch(loadingFinish());
          dispatch({ type: onSuccess, payload: response.data });
        })
        .catch(error =>
          dispatch({ type: onError, payload: error.response.data.errors }),
        );
    }
    if (method === 'POST') {
      axios
        .post(url, { ...action.payload })
        .then(response => {
          dispatch(loadingFinish());
          dispatch({ type: onSuccess, payload: response.data });
        })
        .catch(error => {
          console.log(error.response.data);
          dispatch(loadingFinish());
          dispatch({ type: onError, payload: error.response.data.errors });
        });
    }
  }

  return next(action);
};
