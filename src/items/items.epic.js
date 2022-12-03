import { ajax } from 'rxjs/observable/dom/ajax';

import { getItemUrl } from 'common/api/urls';
import { fetchItem, itemFetched } from 'items/items.actions';

const itemEpic = action$ =>
  action$
    .ofType(fetchItem().type)
    .mergeMap(action =>
      ajax
        .getJSON(getItemUrl(action.payload.id))
        .map((item, index) => itemFetched({ item, index }))
    );

export default itemEpic;
