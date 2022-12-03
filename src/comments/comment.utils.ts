import { ItemMap } from '~/types';

const checkIfKidsHaveChanged = (
  kidIds: string[],
  oldItems: ItemMap,
  newItems: ItemMap
) =>
  kidIds.reduce((acc, curr) => acc || oldItems[curr] !== newItems[curr], false);

export const recursivelyCheckIfKidsChanged = (
  kidIds: string[],
  oldItems: ItemMap,
  newItems: ItemMap
): boolean => {
  if (!kidIds || kidIds.length === 0 || !newItems) return false;
  const isCurrentLevelDifferent = checkIfKidsHaveChanged(
    kidIds,
    oldItems,
    newItems
  );
  if (isCurrentLevelDifferent === true) return true;
  const nextLevelKidIds = kidIds
    .map((kidId) => (newItems[kidId] && newItems[kidId].kids) || [])
    .reduce((acc, curr) => [...acc, ...curr], []);
  return recursivelyCheckIfKidsChanged(nextLevelKidIds, oldItems, newItems);
};
