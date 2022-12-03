import { combineEpics } from 'redux-observable';
import itemEpic from '~/items/items.epic';
import headlinesEpic from '~/headlines/headlines.epic';

const rootEpic = combineEpics(itemEpic, headlinesEpic);
export default rootEpic;
