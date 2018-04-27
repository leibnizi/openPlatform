
import store from '../store/store'
import business from './business'

const setUserInfo = (info: any) => store.dispatch({ type: 'SET_USERINFO', info })
// const getOnlineProduct = (info: any) => store.dispatch({ type: 'GET_ONLINE_PRODUCT', info })

const GET_POSTS = (posts: Object) => {
  return { type: 'SAGA_POSTS', posts }
}

const getUserInfos = () => ({
  type: 'GET_USER_INFOS',
})

const indexChartsAct = () => ({
  type: 'GET_CHARTS',
})

const getOnlineProduct = () => ({
  type: 'GET_ONLINE_PRODUCT',
})

const getMerchantMessage = () => ({
  type: 'GET_MERCHANT_MESSAGE',
})

const getThirtyMessage = () => ({
  type: 'GET_THIRTY_MESSAGE',
})

const getFinancialView = () => ({
  type: 'GET_FINANCIAL_VIEW',
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
  getUserInfos,
  setUserInfo,
  indexChartsAct,
  GET_POSTS,
  getOnlineProduct,
  getMerchantMessage,
  handleUploadBase,
  handleUploadOthers,
  getThirtyMessage,
  getFinancialView
}