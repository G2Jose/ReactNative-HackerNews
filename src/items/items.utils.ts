import { numStoriesToDisplay } from '~/common/constants';

const placeHolderItem = {
  _loaded: false,
  _loading: false,
};

export const createPlaceholderItems = (n, data = {}) =>
  n === 1
    ? { ...placeHolderItem, ...data }
    : new Array(n).fill(placeHolderItem);

export const padWithLoadingItems = (
  arrayToPad,
  targetLength = numStoriesToDisplay
) =>
  !arrayToPad || arrayToPad.length === 0
    ? [
        ...arrayToPad,
        ...createPlaceholderItems(targetLength - arrayToPad.length),
      ]
    : arrayToPad;

export const getNumItems = (itemsToCount) =>
  (itemsToCount && itemsToCount.length) || 0;
