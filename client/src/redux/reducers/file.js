import { SET_IMAGES_FILES, SET_IMAGES } from '../actions/file';

const initState = {
  images: [],
  imagesUrl: null,
};

export function fileReducer(state = initState, action) {
  switch (action.type) {
    case SET_IMAGES_FILES:
      const images = action.payload;
      return { ...state, images };
    case SET_IMAGES:
      const imagesUrl = action.payload;
      return { ...state, imagesUrl };
    default:
      return state;
  }
}
