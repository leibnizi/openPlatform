import { delay, takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import { httpGet } from '../../../src/services/httpRequest'
// import request from 'axios';
// const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms))
interface SagaPostType {
  posts: Object
  type: string
}

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
  
  yield takeEvery('SAGA_POSTS', sagaPost)
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
    console.log(JSON.stringify(action.data), "Www")
    const response = yield call(axios.post, '/api/merchant/edit', JSON.stringify(action.data))  
    yield put({ type: 'GET_BUSINESS_SUCCESS', data: response.data.data });
  } catch (error) {
    // yield put(fetchFailure());
  }
}
export function* sagaPost(body: SagaPostType) {
  try {
    const response = yield call(axios.post, '/api/financial/apply', body.posts)
    console.log('response', response)
    // yield put(GET_POSTS(response.data))
  } catch (error) {
    console.log('error', error)
  }
}