import constants from '../_constants';
import initialState from './initialState';

const { LOAD_ASSET_TYPE_SUCCESS } = constants;

export default (state = initialState.assetTypes, action) => {
  switch (action.type) {
    case LOAD_ASSET_TYPE_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
