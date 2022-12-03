import { combineEpics } from 'redux-observable';
import itemEpic from 'items/items.epic';

const rootEpic = combineEpics(itemEpic);
export default rootEpic;
