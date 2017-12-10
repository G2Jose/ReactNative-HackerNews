import { numStoriesToDisplay } from 'common/constants';

const loadingItem = {
  _loaded: false,
  _loading: true,
};

export const createPlaceholderItems = n =>
  n === 1 ? loadingItem : new Array(n).fill(loadingItem);

export const padWithLoadingItems = (
  arrayToPad,
  targetLength = numStoriesToDisplay
) => [
  ...arrayToPad,
  ...createPlaceholderItems(targetLength - arrayToPad.length),
];
