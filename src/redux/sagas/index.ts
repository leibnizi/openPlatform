import { delay, takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { httpGet } from '../../../src/services/httpRequest'
import axios from 'axios';
// const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms))
// interface SagaPostType {
//   posts: Object
//   type: string
// }

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

export default function* rootSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
  yield takeEvery("GET_USER_INFOS", getUserInfos)

  yield takeEvery("GET_BUSINESS_INFO", getBsInfos)
  yield takeEvery("GET_STATUS_INFO", getStatusInfos)
  yield takeEvery("GET_BILL_INFO", getBillInfos)
  yield takeEvery("GET_ACCOUNT_INFO", getAccountInfos)
  yield takeEvery("DEIETE_STATUS", deleteStatus)
  yield takeEvery("GET_CHARTS", getIndexCharts)
  yield takeEvery("GET_ONLINE_PRODUCT", getOnlineProduct)
  yield takeEvery("GET_MERCHANT_MESSAGE", getMerchantMessage)

  // yield takeEvery('SAGA_POSTS', sagaPost)
  yield takeEvery("UPLOAD_IMAGE", uploadImage) 
  yield takeEvery("POST_BUSINESS_INFO", postBsInfos) 
  yield takeEvery("POST_ACCOUNT_INFO", postAccountInfos)
  yield takeEvery("SAVE_ACCOUNT_PASSWPRD", saveAccountPassword)
  yield takeEvery("POST_BILL_INFO", postBillInfo)

}

export function* uploadImage(action: any = {}) {
  const { formData, token, id, type } = action.data
  try {
    const response = yield call(axios.post, "http://api.v2.msparis.com/common/upload", formData)
    if (response.data.status != "ok") {
      yield put({ type: 'SHOW_GLOBLE_ERR', data: response.msg || "有异常" });
      return false
    }
    yield put({ type: 'UPLOAD_IMAGE_SUCCESS', data: response.data.data });

    const response1 = yield call(axios.post, `/api/qualification/edit/${id}?token=${token}`, {
      file: response.data.data[0].url,
      type_id: type
    })
    if (response1.data.status_code != 0) {
      yield put({ type: 'SHOW_GLOBLE_ERR', data: response1.msg || "有异常" });
      return false
    }
    yield put({ type: 'SHOW_GLOBLE_SUCCESS', data: "修改成功" });
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* getMerchantMessage(action: any = {}) {
  const token = action.data

  try {
    const response = yield call(axios.get, `/api/message/merchant?token=${token}`)
    if (response.data.status_code != 0) {
      yield put({ type: 'SHOW_GLOBLE_ERR', data: response.msg || "有异常" });
      return false
    }
    yield put({ type: 'GET_MERCHANT_MESSAGE_SUCCESS', data: response.data.data });
    // yield put({ type: 'SHOW_GLOBLE_SUCCESS', data: "修改成功" });
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* getOnlineProduct(action: any) {
  try {
    const response = yield call(httpGet, `/api/statistics/online_product?token=${action.data}`);
    yield put({ type: 'GET_ONLINE_PRODUCT_SUCCESS', data: response.data.data });
  } catch (error) {
    // yield put(fetchFailure());
  }
}
export function* getUserInfos(action: any) {
  try {
    const response = yield call(httpGet, `/api/auth/user?token=${action.data}`);
    yield put({ type: 'GET_USER_INFOS_SUCCESS', data: response.data });

  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* getIndexCharts(action: any) {
  try {
    const response = yield call(httpGet, `/api/home/rental-and-sale-detail?token=${action.data}`);
    yield put({ type: 'GET_INDEX_CHARTS_SUCCESS', data: response.data.data });
  } catch (error) {
    // yield put(fetchFailure());
  }
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

    const newData = response.data.data.map((item:any, index:any) => {
      const { id, file, state, type_id, user_id } = item
      return {
        id,
        uid:-id,
        url: file,
        name: 'xxx.png',
        status: 'done',
        state,
        type_id,
        user_id
      }
    })

    yield put({ type: 'GET_STATUS_SUCCESS', data: newData });
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* deleteStatus(action: any) {
  try {
    const response = yield call(httpGet, `/api/qualification/delete/${action.data.id}?token=${action.data.token}`);
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

// export function* postBsInfos(action: any) {
//   try {
//     // const response = yield call(login({a:1}));

//     let param = ''
//     const { data } = action
//     for (let x in data) {
//       param = param + `${x}=${data[x]}%26`

//     }

//     const response = yield call(axios.post, '/api/merchant/edit', JSON.stringify({ sss: "ddd" }), {})  
//     yield put({ type: 'GET_BUSINESS_SUCCESS', data: response.data.data });
//   } catch (error) {
//     // yield put(fetchFailure());
//   }
// }

export function* postBsInfos(action: any = {}) {
  const { token, value } = action.data
  
  try {
    const response = yield call(axios.post, `/api/merchant/edit?token=${token}`, value)
    const { data: { data, msg, status_code } } = response
    if (data instanceof Array  && data.length === 0 && status_code != 0) {
      yield put({ type: 'SHOW_GLOBLE_ERR', data: msg || '有异常' });
      return false
    }
    yield put({ type: 'POST_BUSINESS_SUCCESS', data: data });
    yield put({ type: 'SHOW_GLOBLE_SUCCESS', data: "修改成功" });
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* postAccountInfos(action: any = {}) {
  const { token, value } = action.data
  try {
    const response = yield call(axios.post, `/api/account/edit?token=${token}`, value)
    if (response.data.status_code != 0) {
      yield put({ type: 'SHOW_GLOBLE_ERR', data: response.data.msg });
      return false
    }
    yield put({ type: 'POST_ACCOUNT_SUCCESS', data: response.data.data });
    yield put({ type: 'SHOW_GLOBLE_SUCCESS', data: "修改成功" });
    
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* saveAccountPassword(action: any = {}) {
  const { token, value } = action.data

  try {
    const response = yield call(axios.post, `/api/reset?token=${token}`, value)
    if (response.data.status_code != 0) {
      yield put({ type: 'SHOW_GLOBLE_ERR', data: response.data.msg });
      return false
    }
    yield put({ type: 'SAVE_ACCOUNT_PASSWORD_SUCCESS', data: response.data.data });
    yield put({ type: 'SHOW_GLOBLE_SUCCESS', data: "修改成功" });
    yield put({ type: 'HIDE_ACCOUNT_MOBLE' });

  } catch (error) {
    yield put({ type: 'SHOW_GLOBLE_ERR', data: "出现未知异常" });
    
  }
}

export function* postBillInfo(action: any = {}) {
  const { token, value } = action.data
  try {
    const response = yield call(axios.post, `/api/finance/add?token=${token}`, value)
    if (response.data.status_code != 0) {
      yield put({ type: 'SHOW_GLOBLE_ERR', data: response.data.msg });
      return false
    }
    yield put({ type: 'POST_BILL_INFO_SUCCESS', data: response.data.data });
    yield put({ type: 'SHOW_GLOBLE_SUCCESS', data: "修改成功" });

  } catch (error) {
    yield put({ type: 'SHOW_GLOBLE_ERR', data: "出现未知异常" });
  }
}

// export function* sagaPost(body: SagaPostType) {
//   try {
//     // const response = yield call(axios.post, '/api/financial/apply', body.posts)

//     // yield put(GET_POSTS(response.data))
//   } catch (error) {

//   }
// }