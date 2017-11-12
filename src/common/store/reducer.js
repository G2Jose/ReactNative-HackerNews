import { combineReducers } from 'redux';
import items from 'items/items.reducer';
import stories from 'stories/stories.reducer';

const rootReducer = combineReducers({
  items,
  stories,
});

export default rootReducer;
