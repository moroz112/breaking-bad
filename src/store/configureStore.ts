import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (preloadedState: any) => {
  const enhancers = compose(
    applyMiddleware(thunk, createLogger(), sagaMiddleware),
  );
  const store = createStore(rootReducer, preloadedState, enhancers);
  return store;
};

const store = configureStore({});
sagaMiddleware.run(rootSaga);

export default store;
