import { takeEvery, delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { httpGet } from '../../../src/services/httpRequest'

// const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms))

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

export default function* rootSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
  yield takeEvery("GET_BUSINESS_INFO", fetchBsInfos)
}

export function* fetchBsInfos() {
  console.log('eee')
  try {
    const response = yield call(httpGet, '/api/merchant/index?token=19$$b5fbab2e48ad5a0470ef8a351f9b6aa9');
    // 或者
    // const response = yield call( fetch, fetchUrl );

    // 将上一步调用fetch得到的结果作为某action的参数dispatch，对应saga的put
    yield put({ type: 'GET_BUSINESS_SUCCESS', data: response.data.data });
  } catch (error) {
    // yield put(fetchFailure());
  }
}