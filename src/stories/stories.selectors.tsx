import { createSelector } from 'reselect';

import {
  padWithLoadingItems,
  createPlaceholderItems,
} from '~/items/items.utils';

const idsSelector = (state) => state.stories;
const itemsSelector = (state) => state.items;

export const getStoriesOfType = (type) =>
  createSelector(idsSelector, itemsSelector, (ids, items) =>
    padWithLoadingItems(
      ids[type]
        .map((id) => ({ ...items[id], id }))
        .map((item) => (item.title ? item : createPlaceholderItems(1, item)))
    )
  );
