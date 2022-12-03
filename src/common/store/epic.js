import { combineEpics } from 'redux-observable';
import topStoriesEpic from 'top/top.epic';
import showStoriesEpic from 'show/show.epic';
import newStoriesEpic from 'new/new.epic';
import itemEpic from 'items/items.epic';

const rootEpic = combineEpics(
  topStoriesEpic,
  showStoriesEpic,
  newStoriesEpic,
  itemEpic
);
export default rootEpic;
