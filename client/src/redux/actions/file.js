export const SET_IMAGES_FILES = '[File] Set Images Files';
export const UPLOADE_IMAGES_START = '[File] Uploade Images Start';
export const UPLOADE_IMAGES_SUCCESS = '[File] Uploade Images Success';
export const UPLOADE_IMAGES_FAIL = '[File] Uploade Images Fail';
export const SET_IMAGES = '[file] Set Images';
export const setImagesFiles = payload => ({
  type: SET_IMAGES_FILES,
  payload,
});
export const uploadImages = payload => ({
  type: UPLOADE_IMAGES_START,
  payload,
});

export const setImages = payload => ({
  type: SET_IMAGES,
  payload,
});
