import { combineEpics } from 'redux-observable';
import topStoriesEpic from 'top/top.epic';
import showStoriesEpic from 'show/show.epic';
import newStoriesEpic from 'new/new.epic';

const rootEpic = combineEpics(topStoriesEpic, showStoriesEpic, newStoriesEpic);
export default rootEpic;
