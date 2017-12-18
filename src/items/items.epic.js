import { ajax } from 'rxjs/observable/dom/ajax';
import { combineEpics } from 'redux-observable';

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
  action$.ofType(fetchIds().type).mergeMap(action =>
    ajax.getJSON(getIdsUrl(action.payload.type)).map(ids =>
      idsFetched({
        ids: ids.filter((id, index) => index < numStoriesToDisplay),
        type: action.payload.type,
      })
    )
  );

export default combineEpics(fetchItemEpic, fetchIdsEpic);
