
import store from '../store/store'
import business from './business'
// const businessAction = business;
const onIncrement = () => store.dispatch({ type: 'INCREMENT' })
const onDecrement = () => store.dispatch({ type: 'DECREMENT' })
const onIncrementIfOdd = () => store.dispatch({ type: 'INCREMENT_IF_ODD' })
const onIncrementAsync = () => store.dispatch({ type: 'INCREMENT_ASYNC' })
const setUserInfo = (info: any) => store.dispatch({ type: 'SET_USERINFO', info })

export {
  business,

  onIncrement,
  onDecrement,
  onIncrementIfOdd,
  onIncrementAsync,
  setUserInfo
}