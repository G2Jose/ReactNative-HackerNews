import { handleActions } from 'redux-actions';

import {
  headlineIdsFetched,
  fetchHeadlineIds,
} from '~/headlines/headlines.actions';

export default handleActions(
  {
    [headlineIdsFetched().type](
      state,
      action: ReturnType<typeof headlineIdsFetched>
    ) {
      const { ids, type } = action.payload;
      const newState = { ...state };
      if (newState[type]) {
        newState[type] = ids;
      }
      return newState;
    },
    [fetchHeadlineIds().type](state, action) {
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
