import { createAction } from 'redux-actions';

export const fetchItem = createAction('FETCH_ITEM');
export const itemFetched = createAction('FETCHED_ITEM');

export const itemsFetched = createAction('ITEMS_FETCHED');
