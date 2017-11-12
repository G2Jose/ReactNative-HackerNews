import { handleActions } from 'redux-actions';

import { idsFetched, fetchIds } from 'items/items.actions';
import { numStoriesToDisplay } from 'common/constants';

export default handleActions(
  {
    [idsFetched().type](state, action) {
      const { ids, type } = action.payload;
      const newState = { ...state };
      if (newState[type]) {
        newState[type] = ids.filter((_, index) => index < numStoriesToDisplay);
      }
      return newState;
    },
    [fetchIds().type](state, action) {
      return { ...state, ...{ [action.payload.type]: [] } };
    },
  },
  {
    top: [],
    new: [],
    show: [],
    ask: [],
    jobs: [],
  }
);
