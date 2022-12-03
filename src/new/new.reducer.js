import { handleActions } from 'redux-actions';

import { receivedNewStory, fetchNewStories } from 'new/new.actions';
import { numStoriesToDisplay } from 'common/constants';

export default handleActions(
  {
    [receivedNewStory().type](state, action) {
      const { item, index } = action.payload;
      return state.map((_item, _index) => {
        if (_index !== index) return _item;
        return item;
      });
    },
    [fetchNewStories().type](state) {
      return state.map(() => ({ _loading: true, _loaded: false }));
    },
  },
  new Array(numStoriesToDisplay).fill({
    _loaded: false,
    _loading: true,
  })
);
