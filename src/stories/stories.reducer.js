import { handleActions } from 'redux-actions';

import { idsFetched, fetchIds } from 'stories/stories.actions';

export default handleActions(
  {
    [idsFetched().type](state, action) {
      const { ids, type } = action.payload;
      const newState = { ...state };
      if (newState[type]) {
        newState[type] = ids;
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
    job: [],
  }
);
