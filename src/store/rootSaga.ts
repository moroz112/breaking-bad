import { all, fork } from 'redux-saga/effects';

import episodes from './episodes/sagas';
import characters from './characters/sagas';

// this is main root saga
export default function* root() {
  yield all([
      fork(episodes),
      fork(characters)]
  );
}
