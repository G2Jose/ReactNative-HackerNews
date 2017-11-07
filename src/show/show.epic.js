import epicCreator from 'stories/stories.epicCreator';
import { fetchShowStories, receivedShowStory } from 'show/show.actions';
import { showStoriesUrl, getItemUrl } from 'common/api/urls.js';

const fetchShowStoriesEpic = epicCreator(
  fetchShowStories,
  showStoriesUrl,
  getItemUrl,
  receivedShowStory
);

export default fetchShowStoriesEpic;
