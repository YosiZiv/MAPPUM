import { apiRequest } from '../actions/api';
import {
  UPLOADE_IMAGES_START,
  UPLOADE_IMAGES_SUCCESS,
  UPLOADE_IMAGES_FAIL,
} from '../actions/file';
import { changeSellStage } from '../actions/sell';
import { setMessage, redirectTo, clearUi } from '../actions/ui';

export const uploadImagesStart = ({ dispatch }) => next => action => {
  next(action);
  const URL = 'file/uploadfile';
  if (action.type === UPLOADE_IMAGES_START) {
    console.log(action.payload);
    dispatch(
      apiRequest(
        'POST',
        URL,
        action.payload,
        UPLOADE_IMAGES_SUCCESS,
        UPLOADE_IMAGES_FAIL,
      ),
    );
  }
};
export const uploadImagesSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === UPLOADE_IMAGES_SUCCESS) {
  }
};
export const uploadImagesFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === UPLOADE_IMAGES_FAIL) {
  }
};

export const fileMdl = [
  uploadImagesStart,
  uploadImagesSuccess,
  uploadImagesFail,
];
