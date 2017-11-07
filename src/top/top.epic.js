import epicCreator from 'stories/stories.epicCreator';
import { fetchTopStories, receivedTopStory } from 'top/top.actions';
import { topStoriesUrl, getItemUrl } from 'common/api/urls.js';

const fetchTopStoriesEpic = epicCreator(
  fetchTopStories,
  topStoriesUrl,
  getItemUrl,
  receivedTopStory
);

export default fetchTopStoriesEpic;
