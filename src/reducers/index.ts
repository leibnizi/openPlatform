import { combineReducers } from 'redux';

interface Action {
  type: string;
  payload: Object;
}

function counter(state: number = 0, action: Action) {

  switch (action.type) {

    case 'INCREMENT':
      return state + 1;
    case 'INCREMENT_IF_ODD':
      return (state % 2 !== 0) ? state + 1 : state;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

function counter2(state: number = 0, action: Action) {
  switch (action.type) {
    case 'INCREMENT2':
      return state + 1;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  counter,
  counter2
});

export default rootReducer;
