import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { createStore } from 'redux'
// import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
// import saga from './redux/sagas'
// import rootSaga from './redux/sagas'
import reducer from './redux/reducers'
import routes from './routes'
import './styles/App.less';

// const sagaMiddleware = createSagaMiddleware({saga})
export const store = createStore(
  reducer
)
// sagaMiddleware.run(rootSaga)

interface OldMenuLinkType {
  label: string,
  to: string,
  activeOnlyWhenExact: boolean
}

const OldMenuLink = ({ label, to, activeOnlyWhenExact }:OldMenuLinkType) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <div className={match ? "active" : "normal"}>
        <Link to={to}>{label}</Link>
      </div>
    )}
  />
)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='app'>
            <header className='header'>
              1
            </header>
            <section className='section'>
              <section className='logo'>
                <img
                  src={require('./styles/img/msheader.png')} 
                  alt='头部logo'
                />
                <p>商家后台管理系统</p>
              </section>
              <section className='navigation'>
                {
                  routes.map((item,index)=>
                    <OldMenuLink
                      key={index}
                      activeOnlyWhenExact={index===0?true:false}
                      to={item.path}
                      label={item.label}
                    />
                  )
                }
              </section>
            </section>
            <section className='body'>
              {
                routes.map((item,index)=> {
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
