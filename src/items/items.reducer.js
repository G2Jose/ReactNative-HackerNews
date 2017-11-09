import { handleActions } from 'redux-actions';

import { itemFetched } from 'items/items.actions';

export default handleActions(
  {
    [itemFetched().type](state, action) {
      const { item } = action.payload;
      return { ...state, ...{ [item.id]: item } };
    },
  },
  {}
);
