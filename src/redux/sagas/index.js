import { put, takeEvery, call } from 'redux-saga/effects'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

export default function* rootSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
