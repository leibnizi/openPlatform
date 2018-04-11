import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from "react-router-redux";
import createBrowserHistory from "history/createBrowserHistory";
import rootReducer from '../reducers';
import rootSaga from '../sagas'

export const history = createBrowserHistory();

const initialState: any = { };
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
