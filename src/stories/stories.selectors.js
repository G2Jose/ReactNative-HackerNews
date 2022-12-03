import { createSelector } from 'reselect';

import { padWithPlaceholderStories } from 'items/items.utils';

const idsSelector = state => state.stories;
const itemsSelector = state => state.items;

export const getStoriesOfType = type =>
  createSelector(idsSelector, itemsSelector, (ids, items) =>
    padWithPlaceholderStories(
      ids[type].map(id => items[id]).filter(item => item)
    )
  );
