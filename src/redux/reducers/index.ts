import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userInfo from './home'
import businessInfos from './business/infos'
import business from './business/statusControl'
import billInfos from './business/bill'
import accountInfos from './business/account'
import { message } from 'antd';



function merchantMessage(state: any = { article: [{ title: "" }, { title: "" }, { title: "" }] }, action: any) {
  switch (action.type) {
    case 'GET_MERCHANT_MESSAGE_SUCCESS':
      const newState = Object.assign({}, state, action.data);
      // debugger
      return newState;
    default:
      return state
  }
}

function getOnlineProduct(state: any = 0, action: any) {
  switch (action.type) {
    case 'GET_ONLINE_PRODUCT_SUCCESS':
      const newState = Object.assign({}, state, action.data);
      return newState;
    default:
      return state
  }
}

function getIndexCharts (state: any = 0, action: any) {
  switch (action.type) {
    case 'INCREMENT':
      const newState = Object.assign({}, state, action.data);
      return newState;
    default:
      return state
  }
}

function showGlobleMessage(state: any = 0, action: any) {
  switch (action.type) {
    case 'SHOW_GLOBLE_ERR':
      message.error(action.data);
      break
    case 'SHOW_GLOBLE_SUCCESS':
      message.success(action.data);
    default:
      return state
  }
}

function showModal(state: any = false, action: any) {
  switch (action.type) {
    case 'SHOW_ACCOUNT_MOBLE':
      return true
    case 'HIDE_ACCOUNT_MOBLE':
      return false
    default:
      return state
  }
}



const rootReducer = combineReducers({
  routing:routerReducer,
  showModal,
  showGlobleMessage,
  getIndexCharts,
  merchantMessage,
  getOnlineProduct,
  userInfo,
  businessInfos,
  ...business,
  ...billInfos,
  ...accountInfos
})

export default rootReducer
