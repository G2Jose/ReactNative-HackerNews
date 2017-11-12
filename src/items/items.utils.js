import { numStoriesToDisplay } from 'common/constants';

export const createPlaceholderStories = n =>
  new Array(n).fill({
    _loaded: false,
    _loading: true,
  });

export const padWithPlaceholderStories = (
  arrayOfStories,
  targetLength = numStoriesToDisplay
) => [
  ...arrayOfStories,
  ...createPlaceholderStories(targetLength - arrayOfStories.length),
];
