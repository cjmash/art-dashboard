import constants from '../_constants';
import initialState from './initialState';

const { LOAD_CATEGORIES_SUCCESS, CREATE_CATEGORY_SUCCESS } = constants;

export default (state = initialState.categories, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES_SUCCESS:
      return action.payload;
    case CREATE_CATEGORY_SUCCESS:
      return [...state, action.payload];
    default:
      return state;
  }
};
