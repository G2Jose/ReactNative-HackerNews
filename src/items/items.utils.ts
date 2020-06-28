import { numStoriesToDisplay } from '~/common/constants';

const placeHolderItem = {
  _loaded: false,
  _loading: false,
} as const;

export const createPlaceholderItems = (n: number, data = {}) =>
  n === 1
    ? { ...placeHolderItem, ...data }
    : new Array(n).fill(placeHolderItem);

export const padWithLoadingItems = (
  arrayToPad: unknown[],
  targetLength = numStoriesToDisplay
) =>
  !arrayToPad || arrayToPad.length === 0
    ? [
        ...arrayToPad,
        ...createPlaceholderItems(targetLength - arrayToPad.length),
      ]
    : arrayToPad;

export const getNumItems = (itemsToCount?: unknown[]) =>
  itemsToCount?.length || 0;
