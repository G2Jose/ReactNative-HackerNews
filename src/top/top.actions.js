import { createAction } from 'redux-actions';

export const fetchTopStories = createAction('FETCH_TOP_STORIES');
export const receivedTopStory = createAction('RECEIVED_TOP_STORY');
