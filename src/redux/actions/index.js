import {store} from '../../App'

export const onIncrement = () =>  store.dispatch({type:'INCREMENT'})
export const onDecrement = () => store.dispatch({type:'DECREMENT'})
export const onIncrementIfOdd = () => store.dispatch({type:'INCREMENT_IF_ODD'})
export const onIncrementAsync = () => store.dispatch({type:'INCREMENT_ASYNC'})
