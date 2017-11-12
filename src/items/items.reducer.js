import { handleActions } from 'redux-actions';

import { itemFetched, idsFetched } from 'items/items.actions';

export default handleActions(
  {
    [itemFetched().type](state, action) {
      const { item } = action.payload;
      return { ...state, ...{ [item.id]: item } };
    },
    [idsFetched().type](state, action) {
      const { ids } = action.payload;
      const newState = { ...state };
      ids.forEach(idToDelete => delete newState[idToDelete]);
      return newState;
    },
  },
  {}
);
