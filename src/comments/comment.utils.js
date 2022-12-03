const checkIfKidsHaveChanged = (kidIds, oldItems, newItems) =>
  kidIds.reduce((acc, curr) => acc || oldItems[curr] !== newItems[curr], false);

export const recursivelyCheckIfKidsChanged = (kidIds, oldItems, newItems) => {
  if (!kidIds || kidIds.length === 0) return false;
  const isCurrentLevelDifferent = checkIfKidsHaveChanged(
    kidIds,
    oldItems,
    newItems
  );
  if (isCurrentLevelDifferent === true) return true;
  const nextLevelKidIds = kidIds
    .map(kidId => (newItems[kidId] && newItems[kidId].kids) || [])
    .reduce((acc, curr) => [...acc, ...curr], []);
  return recursivelyCheckIfKidsChanged(nextLevelKidIds, oldItems, newItems);
};
