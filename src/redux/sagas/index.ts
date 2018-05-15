import { delay, takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import request from '../../../src/services/httpRequest'

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

export default function* rootSaga() {
  yield takeEvery("GET_USER_INFOS", getUserInfos)

  yield takeEvery("GET_BUSINESS_INFO", getBsInfos)
  yield takeEvery("GET_STATUS_INFO", getStatusInfos)
  yield takeEvery("GET_BILL_INFO", getBillInfos)
  yield takeEvery("GET_ACCOUNT_INFO", getAccountInfos)
  yield takeEvery("DEIETE_STATUS", deleteStatus)

  // 首页相关请求
  yield takeEvery("GET_FINANCIAL_VIEW", getFinancialView)
  yield takeEvery("GET_CHARTS", getIndexCharts)
  yield takeEvery("GET_THIRTY_MESSAGE", getThirtyMessage)
  yield takeEvery("GET_ONLINE_PRODUCT", getOnlineProduct)
  yield takeEvery("GET_MERCHANT_MESSAGE", getMerchantMessage)
  // 

  // yield takeEvery('SAGA_POSTS', sagaPost)
  //资质管理
  yield takeEvery("UPLOAD_IMAGE_BASE", uploadImageBase)
  yield takeEvery("UPLOAD_IMAGE_ADD", uploadImageAdd)

  //提交商家信息
  yield takeEvery("POST_BUSINESS_INFO", postBsInfos)
  //提交账户
  yield takeEvery("POST_ACCOUNT_INFO", postAccountInfos)
  //修改账户密码
  yield takeEvery("SAVE_ACCOUNT_PASSWPRD", saveAccountPassword)
  //添加财务信息
  yield takeEvery("POST_BILL_INFO", postBillInfo)
  /* 获取订单状态 */
  yield takeEvery("GET_STATUS_LIST", getStatusList)
}

//把上传到的图片路径传给后端(基础资质)
export function* uploadImageBase(action: any = {}) {
  const { statusUrl, id } = action.data
  try {
    const response = yield call(request.post, "/api/qualification/edit/", {
      id,
      file: statusUrl
    })
    if (response.status_code != 0) {
      return false
    }
    yield put({ type: 'SHOW_GLOBLE_SUCCESS', data: response.data.msg || "操作成功！！" });
    yield put({ type: "GET_STATUS_INFO" })
    // yield put({ type: 'UPLOAD_IMAGE_BASE_SUCCESS', data: response.data.data });
    // case 'ADD_STATUS_SUCCESS':
    // return action.data
  } catch (error) {
    // yield put(fetchFailure());
  }
}

//把上传到的图片路径传给后端(补充资质-添加)
export function* uploadImageAdd(action: any = {}) {
  // const { file, type_id } = action.data
  try {
    const response = yield call(request.post, "/api/qualification/add", {
      files: action.data
    })

    if (response.status_code != 0) {
      return false
    }
    yield put({ type: 'SHOW_GLOBLE_SUCCESS', data: response.msg || "操作成功！！" });
    yield put({ type: "ADD_STATUS_SUCCESS", data: response.data })
    // yield put({ type: 'UPLOAD_IMAGE_BASE_SUCCESS', data: true });
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* getMerchantMessage(action: any = {}) {
  try {
    const response = yield call(request.get, "/api/message/merchant")
    if (response.status_code != 0) {
      return false
    }
    yield put({ type: 'GET_MERCHANT_MESSAGE_SUCCESS', data: response.data });
    // yield put({ type: 'SHOW_GLOBLE_SUCCESS', data: "修改成功" });
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* getOnlineProduct(action: any) {
  try {
    const response = yield call(request, `/api/statistics/online_product?token=${action.data}`);
    yield put({ type: 'GET_ONLINE_PRODUCT_SUCCESS', data: response.data });
  } catch (error) {
    // yield put(fetchFailure());
  }
}
export function* getUserInfos(action: any) {
  try {
    const response = yield call(request.get, '/api/auth/user');
    yield put({ type: 'GET_USER_INFOS_SUCCESS', data: response.data });

  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* getThirtyMessage(action: any) {
  try {
    const response = yield call(request.get, '/api/home/rental-and-sale-aggregate');
    yield put({ type: 'GET_THIRTY_MESSAGE_SUCCESS', data: response.data });
  } catch (error) {

  }
}

export function* getFinancialView(action: any) {
  try {
    const response = yield call(request.get, '/api/financial/financial_view');
    yield put({ type: 'GET_FINANCIAL_VIEW_SUCCESS', data: response.data });
  } catch (error) {

  }
}


export function* getIndexCharts(action: any) {
  try {
    const response = yield call(request.get, "/api/home/rental-and-sale-detail");
    yield put({ type: 'GET_INDEX_CHARTS_SUCCESS', data: response.data });
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* getBsInfos(action: any) {
  try {
    const response = yield call(request.get, "/api/merchant/index");
    // 类目的所有 是个数组
    const categoryAll = yield call(request.get, "/api/config/product-category");

    //选中类目文案数组
    const categoryText = response.data.category_id.map(item => categoryAll.data[`${item}`])

    response.data.categoryText = categoryText
    response.data.categoryAll = categoryAll.data
    yield put({ type: 'GET_BUSINESS_SUCCESS', data: response.data });
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* getStatusInfos(action: any) {
  try {
    const response = yield call(request.get, "/api/qualification/index");
    const newData = response.data
    // const newData = response.data.map((item:any, index:any) => {
    //   // const { id, file, state, type_id, user_id } = item
    //   // return {
    //   //   id,
    //   //   uid:-id,
    //   //   url: file,
    //   //   name: 'xxx.png',
    //   //   status: 'done',
    //   //   state,
    //   //   type_id,
    //   //   user_id
    //   // }
    // })

    yield put({ type: 'GET_STATUS_SUCCESS', data: newData });
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* deleteStatus(action: any) {
  try {
    const { id } = action.data
    const response = yield call(request.get, "/api/qualification/delete/", {
      params: {
        id
      }
    });
    yield put({ type: 'DEIETE_STATUS_SUCCESS', data: response.data });
    // yield put({ type: "GET_STATUS_INFO" })
    yield put({ type: 'SHOW_GLOBLE_SUCCESS', data: response.msg });
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* getAccountInfos(action: any) {
  try {
    const response = yield call(request.get, "/api/account/index");

    yield put({ type: 'GET_ACCOUNT_SUCCESS', data: response.data });
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* postBsInfos(action: any = {}) {
  const value = action.data

  try {
    const response = yield call(request.post, "/api/merchant/edit", value);

    const { data, msg, status_code } = response
    if (data instanceof Array && data.length === 0 && status_code != 0) {
      return false
    }

    yield put({ type: 'PUSH_BSINFO', data: { pushBsinfo: true } });
    yield put({ type: 'POST_BUSINESS_SUCCESS', data: data });
    yield put({ type: 'SHOW_GLOBLE_SUCCESS', data: "修改成功" });
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* postAccountInfos(action: any = {}) {
  const value = action.data
  try {
    const response = yield call(request.post, "/api/account/edit", value);
    if (response.status_code != 0) {
      return false
    }
    yield put({ type: 'POST_ACCOUNT_SUCCESS', data: response.data });
    yield put({ type: 'SHOW_GLOBLE_SUCCESS', data: "修改成功" });
    yield put({ type: 'HIDE_ACCOUNT_MOBLE' });

  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* saveAccountPassword(action: any = {}) {
  const value = action.data

  try {
    const response = yield call(request.post, "/api/reset", value);

    if (response.status_code != 0) {
      return false
    }
    yield put({ type: 'SAVE_ACCOUNT_PASSWORD_SUCCESS', data: response.data });
    yield put({ type: 'SHOW_GLOBLE_SUCCESS', data: "修改成功" });
    yield put({ type: 'HIDE_ACCOUNT_MOBLE' });

  } catch (error) {

  }
}

export function* getBillInfos(action: any) {
  try {
    const response = yield call(request.get, "/api/finance/index");
    if (response.data) {
      yield put({ type: 'GET_BILL_SUCCESS', data: response.data });
    }
  } catch (error) {
    // yield put(fetchFailure());
  }
}

export function* postBillInfo(action: any = {}) {
  const { token, value } = action.data
  try {
    const response = yield call(request.post, "/api/finance/add", {
      ...value
    });

    if (response.status_code != 0) {
      return false
    }
    yield put({ type: 'POST_BILL_INFO_SUCCESS', data: response.data });
    yield put({ type: 'SHOW_GLOBLE_SUCCESS', data: "修改成功" });

  } catch (error) {

  }
}

function* getStatusList(action: any) {
  try {
    const response = yield call(request.get, "/api/config/order-status", { params: { type: action.data } })
    if (response.status_code != 0) {
      return false
    } else {
      yield put({ type: 'SET_STATUS_LIST', data: response.data });
    }
  } catch (err) {
    console.log('err', err)
  }
}