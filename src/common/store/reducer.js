import { combineReducers } from 'redux';
import topStories from 'top/top.reducer';
import showStories from 'show/show.reducer';
import newStories from 'new/new.reducer';

const rootReducer = combineReducers({
  topStories,
  showStories,
  newStories,
});

export default rootReducer;
