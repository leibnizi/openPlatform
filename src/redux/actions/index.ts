
import store from '../store/store'
import business from './business'
import operation from './operation'

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
  // id: "",
})
const handleUploadAdd = (prarms:any) => ({
  type: 'UPLOAD_IMAGE_ADD',
  data: prarms
  // dispatch(handleUploadAdd({
  //   file: this.hasUploadOrdersImagesUrls[0],
  //   type_id: 2,
  // }))
})

export {
  business,
  operation,
  getUserInfos,
  setUserInfo,
  indexChartsAct,
  GET_POSTS,
  getOnlineProduct,
  getMerchantMessage,
  handleUploadBase,
  handleUploadAdd,
  getThirtyMessage,
  getFinancialView
}