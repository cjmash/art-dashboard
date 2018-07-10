import axios from 'axios';
import constants from '../_constants';

const {
  LOAD_ALLOCATIONS_SUCCESS,
  LOAD_ALLOCATIONS_FAILURE,
  LOADING_ALLOCATIONS
} = constants;

const loadAllocationsAction = pageNumber => (dispatch) => {
  dispatch({ type: LOADING_ALLOCATIONS });
  return axios.get(`allocations?page=${pageNumber}`)
    .then(response => dispatch({
      type: LOAD_ALLOCATIONS_SUCCESS,
      payload: response.data
    })).catch(error => dispatch({
      type: LOAD_ALLOCATIONS_FAILURE,
      payload: error
    }));
};

export default loadAllocationsAction;