// third-party library
import expect from 'expect';
import * as faker from 'faker';

// reducer
import modelNumberReducer from '../../_reducers/modelNumber.reducer';

// initial mock State
import { mockStore } from '../../_mock/mockStore';

import {
  loadModelNumbersSuccess,
  createModelNumberSuccess,
  createModelNumberFailure
} from '../../_actions/modelNumbers.actions';

describe('Model Number Reducer tests', () => {
  const modelNumbers = Array(3).fill({}).map((value, index) => ({
    id: index,
    model_number: faker.random.word(),
    make_label: faker.random.word()
  }));

  it('should handle LOAD_ASSET_MODEL_NUMBERS', () => {
    const action = loadModelNumbersSuccess(modelNumbers);
    expect(mockStore.modelNumbers.length).toEqual(0);
    expect(modelNumberReducer(mockStore.modelNumbers, action)).toEqual(modelNumbers);
  });

  it('should handle CREATE_MODEL_NUMBER_SUCCESS', () => {
    const action = createModelNumberSuccess(modelNumbers[0]);
    expect(mockStore.modelNumbers.length).toEqual(0);
    expect(modelNumberReducer(mockStore.modelNumbers, action).length)
      .toEqual(1);
  });

  it('should handle CREATE_MODEL_NUMBER_FAILURE', () => {
    const action = createModelNumberFailure('Invalid');
    expect(mockStore.modelNumbers.length).toEqual(0);
    expect(modelNumberReducer(mockStore.modelNumbers, action).length)
      .toEqual(0);
  });
});
