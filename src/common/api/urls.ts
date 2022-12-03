export const topStoriesUrl =
  'https://hacker-news.firebaseio.com/v0/topstories.json';
export const askStoriesUrl =
  'https://hacker-news.firebaseio.com/v0/askstories.json';
export const showStoriesUrl =
  'https://hacker-news.firebaseio.com/v0/showstories.json';
export const newStoriesUrl =
  'https://hacker-news.firebaseio.com/v0/newstories.json';

export const getItemUrl = (id: string) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

export const getIdsUrl = (type: string) =>
  `https://hacker-news.firebaseio.com/v0/${type}stories.json`;
