import { createAction } from 'redux-actions';

export const fetchNewStories = createAction('FETCH_NEW_STORIES');
export const receivedNewStory = createAction('RECEIVED_NEW_STORY');
