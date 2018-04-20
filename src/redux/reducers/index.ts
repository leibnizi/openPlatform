import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userInfo from './userInfo'
import businessInfos from './business/infos'
import business from './business/statusControl'
import billInfos from './business/bill'
import accountInfos from './business/account'

function counter (state: any = 0, action: any) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'INCREMENT_IF_ODD':
      return (state % 2 !== 0) ? state + 1 : state
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

function counter2(state: any = 0, action: any) {
  switch (action.type) {
    case 'INCREMENT2':
      return state + 1
    default:
      return state
  }
}

const rootReducer = combineReducers({
  counter,
  counter2,
  routing:routerReducer,
  userInfo,
  businessInfos,
  ...business,
  billInfos,
  accountInfos
})

export default rootReducer
