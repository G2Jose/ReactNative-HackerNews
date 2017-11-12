import { combineReducers } from 'redux';
import topStories from 'top/top.reducer';
import showStories from 'show/show.reducer';
import newStories from 'new/new.reducer';
import items from 'items/items.reducer';
import stories from 'stories/stories.reducer';

const rootReducer = combineReducers({
  topStories,
  showStories,
  newStories,
  items,
  stories,
});

export default rootReducer;
