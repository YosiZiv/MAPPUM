import { SET_IMAGES_FILES } from '../actions/file';

const initState = {
  images: [],
};

export function fileReducer(state = initState, action) {
  switch (action.type) {
    case SET_IMAGES_FILES:
      const images = [...state.images];
      action.payload.forEach(file => {
        images.push(file);
      });
      return { ...state, images };
    default:
      return state;
  }
}
