import { ajax } from 'rxjs/observable/dom/ajax';
import { combineEpics } from 'redux-observable';

import { Observable } from 'rxjs';

import { getItemUrl, getIdsUrl } from 'common/api/urls';
import { numStoriesToDisplay } from 'common/constants';

import { idsFetched, fetchIds } from 'stories/stories.actions';
import { fetchItem, itemFetched } from 'items/items.actions';

const fetchItemEpic = action$ =>
  action$
    .ofType(fetchItem().type)
    .mergeMap(action =>
      ajax
        .getJSON(getItemUrl(action.payload.id))
        .map((item, index) => itemFetched({ item, index }))
    );

const fetchIdsEpic = action$ =>
  action$
    .ofType(fetchIds().type)
    .mergeMap(action =>
      ajax
        .getJSON(getIdsUrl(action.payload.type))
        .map(ids => idsFetched({ ids, type: action.payload.type }))
    );

const fetchItemsForIdsEpic = action$ =>
  action$.ofType(idsFetched().type).mergeMap(action =>
    Observable.from(action.payload.ids)
      .take(numStoriesToDisplay)
      .map(id => fetchItem({ id }))
  );

export default combineEpics(fetchItemEpic, fetchIdsEpic, fetchItemsForIdsEpic);
