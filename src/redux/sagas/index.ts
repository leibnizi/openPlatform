import { delay, takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { httpGet } from '../../../src/services/httpRequest'
import request from 'axios'

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

export default function* rootSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
  yield takeEvery("GET_BUSINESS_INFO", getBsInfos)
  yield takeEvery("GET_STATUS_INFO", getStatusInfos)
  yield takeEvery("GET_BILL_INFO", getBillInfos)
  yield takeEvery("GET_ACCOUNT_INFO", getAccountInfos)
  yield takeEvery("POST_BUSINESS_INFO", postBsInfos)
  yield takeEvery("DEIETE_STATUS", deleteStatus)
  
}

export function* getBsInfos(action:any) {
  try {
    const response = yield call(httpGet, `/api/merchant/index?token=${action.data}`);
    // 或者
    // const response = yield call( fetch, fetchUrl );

    // 将上一步调用fetch得到的结果作为某action的参数dispatch，对应saga的put
    yield put({ type: 'GET_BUSINESS_SUCCESS', data: response.data.data });
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* getStatusInfos(action: any) {
  try {
    const response = yield call(httpGet, `/api/qualification/index?token=${action.data}`);
    yield put({ type: 'GET_STATUS_SUCCESS', data: response.data.data });
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* deleteStatus(action: any) {
  try {
    const response = yield call(httpGet, `/api/qualification/delete/index${action.id}?token=${action.data.token}`);
    yield put({ type: 'DEIETE_STATUS_SUCCESS', data: response.msg });
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* getBillInfos(action: any) {
  try {
    const response = yield call(httpGet, `/api/finance/index?token=${action.data}`);
    yield put({ type: 'GET_BILL_SUCCESS', data: response.data.data });
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* getAccountInfos(action: any) {
  try {
    const response = yield call(httpGet, `/api/account/index?token=${action.data}`);
    yield put({ type: 'GET_ACCOUNT_SUCCESS', data: response.data.data });
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* postBsInfos(action: any) {
  try {
    // const response = yield call(login({a:1}));
    const response = yield call(request.post, '/api/merchant/edit', action.data)
    // 或者
    // const response = yield call( fetch, fetchUrl );

    // 将上一步调用fetch得到的结果作为某action的参数dispatch，对应saga的put
    yield put({ type: 'GET_BUSINESS_SUCCESS', data: response.data.data });
  } catch (error) {
    // yield put(fetchFailure());
  }
}