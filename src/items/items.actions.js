import { createAction } from 'redux-actions';

export const fetchItem = createAction('FETCH_ITEM');
export const itemFetched = createAction('FETCHED_ITEM');
export const fetchIds = createAction('FETCH_IDS');
export const idsFetched = createAction('IDS_FETCHED');
export const itemsFetched = createAction('ITEMS_FETCHED');
