import { ajax } from 'rxjs/observable/dom/ajax';
import { combineEpics, ActionsObservable } from 'redux-observable';

import { getIdsUrl } from '~/common/api/urls';
import { numStoriesToDisplay } from '~/common/constants';

import {
  fetchHeadlineIds,
  headlineIdsFetched,
} from '~/headlines/headlines.actions';

const fetchHeadlineIdsEpic = (
  action$: ActionsObservable<{ type: string; payload: any }>
) =>
  action$.ofType(fetchHeadlineIds().type).mergeMap((action) =>
    ajax.getJSON<string[]>(getIdsUrl(action.payload.type)).map((ids) =>
      headlineIdsFetched({
        ids: ids.filter((id, index) => index < numStoriesToDisplay),
        type: action.payload.type,
      })
    )
  );

export default combineEpics(fetchHeadlineIdsEpic);
