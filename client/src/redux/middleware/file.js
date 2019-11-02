import { apiRequest } from '../actions/api';
import {
  UPLOADE_IMAGES_START,
  UPLOADE_IMAGES_SUCCESS,
  UPLOADE_IMAGES_FAIL,
  setImages,
} from '../actions/file';
import { setMessage } from '../actions/ui';
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
    dispatch(setImages(action.payload));
  }
};
export const uploadImagesFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === UPLOADE_IMAGES_FAIL) {
    dispatch(setMessage(action.payload));
  }
};

export const fileMdl = [
  uploadImagesStart,
  uploadImagesSuccess,
  uploadImagesFail,
];
