import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import reducer from './redux/reducers';
import rootSaga from './redux/sagas'
import routes from './routes';
import './styles/App.less';
// import { PageLayout } from './Layout'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSaga)

const OldMenuLink = ({ label, to, activeOnlyWhenExact }: any) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <div className={match ? 'active' : 'normal'}>
        <Link to={to}>{label}</Link>
      </div>
    )}
  />
)

class App extends React.Component<any,any> {
  
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <header className="header" />
            <section className="section">
              <section className="logo">
                <img src={require('./styles/img/msheader.png')} alt="头部logo" />
                <p>商家后台管理系统</p>
              </section>
              <section className="navigation">
                {
                  routes.map((item, index) =>
                    <OldMenuLink
                      key={index}
                      activeOnlyWhenExact={index === 0 ? true : false}
                      to={item.path}
                      label={item.label}
                    />
                  )
                }
              </section>
            </section>
            <section className="body">
              {
                routes.map((item, index) => {
                  if (index === 0) {
                    return (
                      <Route
                        key={index}
                        exact={true}
                        path={item.path}
                        component={item.component}
                      />
                    )
                  } else {
                    return (
                      <Route
                        key={index}
                        path={item.path}
                        component={item.component}
                      />
                    )
                  }
                })
              }
            </section>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App