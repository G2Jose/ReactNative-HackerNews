import { handleActions } from 'redux-actions';

import { receivedTopStory, fetchTopStories } from 'top/top.actions';
import { numStoriesToDisplay } from 'common/constants';

export default handleActions(
  {
    [receivedTopStory().type](state, action) {
      const { item, index } = action.payload;
      return state.map((_item, _index) => {
        if (_index !== index) return _item;
        return item;
      });
    },
    [fetchTopStories().type](state) {
      return state.map(() => ({ _loading: true, _loaded: false }));
    },
  },
  new Array(numStoriesToDisplay).fill({
    _loaded: false,
    _loading: true,
  })
);
