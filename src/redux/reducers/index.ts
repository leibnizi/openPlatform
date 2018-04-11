import { combineReducers } from 'redux';

function counter(state: any = 0, action: any) {
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
  counter2
})

export default rootReducer
