import { combineReducers } from 'redux';
import items from '~/items/items.reducer';
import headlines from '~/headlines/headlines.reducer';

const rootReducer = combineReducers({
  items,
  stories: headlines,
});

export default rootReducer;
