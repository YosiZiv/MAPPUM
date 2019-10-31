export const SET_IMAGES_FILES = '[File] Set Images Files';
export const UPLOADE_IMAGES_START = '[File] Uploade Images Start';
export const UPLOADE_IMAGES_SUCCESS = '[File] Uploade Images Success';
export const UPLOADE_IMAGES_FAIL = '[File] Uploade Images Fail';

export const setImagesFiles = payload => {
  console.log('set images payload ', payload);

  return {
    type: SET_IMAGES_FILES,
    payload,
  };
};
export const uploadImages = payload => {
  console.log(payload);

  return {
    type: UPLOADE_IMAGES_START,
    payload,
  };
};
