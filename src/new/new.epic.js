import epicCreator from 'stories/stories.epicCreator';
import { fetchNewStories, receivedNewStory } from 'new/new.actions';
import { newStoriesUrl, getItemUrl } from 'common/api/urls.js';

const fetchNewStoriesEpic = epicCreator(
  fetchNewStories,
  newStoriesUrl,
  getItemUrl,
  receivedNewStory
);

export default fetchNewStoriesEpic;
