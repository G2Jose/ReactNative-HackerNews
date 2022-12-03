import { ajax } from 'rxjs/observable/dom/ajax';
import { combineEpics } from 'redux-observable';

import { getIdsUrl } from 'common/api/urls';
import { numStoriesToDisplay } from 'common/constants';

import {
  fetchHeadlineIds,
  headlineIdsFetched,
} from 'headlines/headlines.actions';

const fetchHeadlineIdsEpic = action$ =>
  action$.ofType(fetchHeadlineIds().type).mergeMap(action =>
    ajax.getJSON(getIdsUrl(action.payload.type)).map(ids =>
      headlineIdsFetched({
        ids: ids.filter((id, index) => index < numStoriesToDisplay),
        type: action.payload.type,
      })
    )
  );

export default combineEpics(fetchHeadlineIdsEpic);
