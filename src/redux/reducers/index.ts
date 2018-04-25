import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userInfo from './home'
import businessInfos from './business/infos'
import business from './business/statusControl'
import billInfos from './business/bill'
import accountInfos from './business/account'
import { message } from 'antd';


function uploadImageBack(state: any = [], action: any) {
  switch (action.type) {
    case 'UPLOAD_IMAGE_BASE_SUCCESS':
      // // const newState = Object.assign({}, state, action.data);
      // console.log(action.data,"ggg")
      return action.data;
    default:
      return state
  }
}

function merchantMessage(state: any = { article: [{ title: "" }, { title: "" }, { title: "" }] }, action: any) {
  switch (action.type) {
    case 'GET_MERCHANT_MESSAGE_SUCCESS':
      const newState = Object.assign({}, state, action.data);
      return newState;
    default:
      return state
  }
}

function getOnlineProduct(state: any = {}, action: any) {
  switch (action.type) {
    case 'GET_ONLINE_PRODUCT_SUCCESS':
      const newState = Object.assign({}, state, action.data);
      return newState
    default:
      return state
  }
}

function getThirtyMessage(state: any = {}, action: any) {
  switch (action.type) {
    case 'GET_THIRTY_MESSAGE_SUCCESS':
      const newState = Object.assign({}, state, action.data);
      return newState
    default:
      return state
  }
}

function getIndexCharts (state: any = 0, action: any) {
  switch (action.type) {
    case 'GET_INDEX_CHARTS_SUCCESS':
      const newState = Object.assign({}, state, action.data);
      return newState;
    default:
      return state
  }
}

function showGlobleMessage(state: any ={}, action: any) {
  switch (action.type) {
    case 'SHOW_GLOBLE_ERR':
      message.error(action.data);
      return false
    case 'SHOW_GLOBLE_SUCCESS':
      message.success(action.data);
      return false
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
  uploadImageBack,
  showGlobleMessage,
  getIndexCharts,
  merchantMessage,
  getOnlineProduct,
  userInfo,
  getThirtyMessage,
  businessInfos,
  ...business,
  ...billInfos,
  ...accountInfos
})

export default rootReducer
