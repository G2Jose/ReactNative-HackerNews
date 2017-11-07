import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'remote-redux-devtools';

import rootEpic from 'common/store/epic';
import rootReducer from 'common/store/reducer';

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
  rootReducer,
  composeWithDevTools({ maxAge: 500 })(applyMiddleware(epicMiddleware))
);

export default store;
