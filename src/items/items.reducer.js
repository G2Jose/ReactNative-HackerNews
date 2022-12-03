import { handleActions } from 'redux-actions';

import { itemFetched, fetchItem } from 'items/items.actions';
import { idsFetched } from 'stories/stories.actions';

export default handleActions(
  {
    [itemFetched().type](state, action) {
      const { item } = action.payload;
      return {
        ...state,
        ...{ [item.id]: { ...item, _loading: false, _loaded: true } },
      };
    },
    [idsFetched().type](state, action) {
      const { ids } = action.payload;
      const newState = { ...state };
      ids.forEach(idToDelete => delete newState[idToDelete]);
      return newState;
    },
    [fetchItem().type](state, action) {
      const { id } = action.payload;
      return { ...state, ...{ [id]: { _loading: true, _loaded: false } } };
    },
  },
  {}
);
