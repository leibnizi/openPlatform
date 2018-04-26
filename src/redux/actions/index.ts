
import store from '../store/store'
import business from './business'

const setUserInfo = (info: any) => store.dispatch({ type: 'SET_USERINFO', info })
// const getOnlineProduct = (info: any) => store.dispatch({ type: 'GET_ONLINE_PRODUCT', info })

const GET_POSTS = (posts: Object) => {
  return { type: 'SAGA_POSTS', posts }
}

const getUserInfos = (token: any) => ({
  type: 'GET_USER_INFOS',
  data: token
})

const indexChartsAct = (token: any) => ({
  type: 'GET_CHARTS',
  data: token
})

const getOnlineProduct = (token: any) => ({
  type: 'GET_ONLINE_PRODUCT',
  data: token
})

const getMerchantMessage = (token: any) => ({
  type: 'GET_MERCHANT_MESSAGE',
  data: token
})

const getThirtyMessage = (token: any) => ({
  type: 'GET_THIRTY_MESSAGE',
  data: token
})

const handleUploadBase = (prarms:any) => ({
  type: 'UPLOAD_IMAGE_BASE',
  data: {...prarms}
  // statusUrl,
  // type_id: 1,
  // token
})
const handleUploadOthers = (prarms:any) => ({
  type: 'UPLOAD_IMAGE_OTHERS',
  data: {...prarms}
})

export {
  business,
  // onIncrement,
  // onDecrement,
  // onIncrementIfOdd,
  // onIncrementAsync,,
  getUserInfos,
  setUserInfo,
  indexChartsAct,
  GET_POSTS,
  getOnlineProduct,
  getMerchantMessage,
  handleUploadBase,
  handleUploadOthers,
  getThirtyMessage
}