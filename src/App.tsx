import * as React from 'react'
import { BrowserRouter, Link } from "react-router-dom"
import { Route, Switch } from 'react-router'
import { createStore } from 'redux'
// import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
// import saga from './redux/sagas'
// import rootSaga from './redux/sagas'
import reducer from './redux/reducers'
import routes from './routes'
import Splash from './pages/splash'
import Login from './pages/splash/login'
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

class Content extends React.Component {
  render() {
    return (
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
              return (
                <Route
                  key={index}
                  exact={index === 0?true:false}
                  path={item.path}
                  component={item.component}
                />
              )
            })
          }
        </section>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    console.log('appredner')
    return (
      <Provider store={store}>
          <BrowserRouter>
            <Switch>    
              <Route
                path="/login" 
                component={Login}
              />
              <Route
                path="/splash" 
                component={Splash}
              />
              <Route
                path="/" 
                component={Content}
              />
            </Switch>
          </BrowserRouter>
      </Provider>
    )
  }
}

export default App
