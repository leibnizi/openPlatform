
import store from '../store/store'
import business from './business'
// const businessAction = business;
// const onIncrement = () => store.dispatch({ type: 'INCREMENT' })
// const onDecrement = () => store.dispatch({ type: 'DECREMENT' })
// const onIncrementIfOdd = () => store.dispatch({ type: 'INCREMENT_IF_ODD' })
// const onIncrementAsync = () => store.dispatch({ type: 'INCREMENT_ASYNC' })
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
  getMerchantMessage
}