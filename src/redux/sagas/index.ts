import { takeEvery, delay } from 'redux-saga';
import { put } from 'redux-saga/effects';

// const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms))

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

export default function* rootSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
