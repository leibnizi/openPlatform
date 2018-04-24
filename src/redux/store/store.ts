import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from "react-router-redux";
import createBrowserHistory from "history/createBrowserHistory";
import rootReducer from '../reducers';
import rootSaga from '../sagas'

export const history = createBrowserHistory();

const initialState: any = { userInfo: { token: '19$$b5fbab2e48ad5a0470ef8a351f9b6aa9' } };
const enhancers: Array<any> = [];

const sagaMiddleware = createSagaMiddleware()

const middlewares = [
  routerMiddleware(history),
  sagaMiddleware
]
const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers
)

const store: any = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

sagaMiddleware.run(rootSaga)

export default store;
