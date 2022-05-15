import { all, call, put, takeLatest } from 'redux-saga/effects';
import {getCharacterById} from '../../rest';
import { characterGetOneError, characterGetOneSuccess } from './actions';
import { CharacterGetOneAction, CHARACTER_GET_ONE } from './types';

export function* getOneCharacterWorker(action: CharacterGetOneAction) {
  try {
    const { data } = yield call(getCharacterById, action.payload);
    if (data) {
      yield put(characterGetOneSuccess(data[0]));
    } else {
      yield put(characterGetOneError('Empty Response'));
    }
  } catch (err) {
    const { response }: any = err;
    const { data } = response;
    const message = Array.isArray(data.message) ? data.message[0] : data.message;
    yield put(characterGetOneError(message));
  }
}

export default function* root() {
  yield all([takeLatest(CHARACTER_GET_ONE, getOneCharacterWorker)]);
}
