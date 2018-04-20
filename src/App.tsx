import * as React from 'react'
import { BrowserRouter, Link } from "react-router-dom"
import { Route, Switch } from 'react-router'
import { Provider } from 'react-redux'
import routes from './routes'
import Splash from './pages/splash'
import Login from './pages/splash/login'
import Register from './pages/splash/register'
import store from './redux/store/store';
import './styles/App.less';

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
          <div className="top">
            1
          </div>
          <div className='header-box'>
            <div className='logo'>
              <img
                src={require('./styles/img/msheader.png')} 
                alt='头部logo'
              />
              <div>商家后台管理系统</div>
            </div>
            <div className='navigation'>
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
            </div>
          </div>
        </header>
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

class RegisterRoute extends React.Component {
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
            <OldMenuLink
              activeOnlyWhenExact={true}
              to={'/register'}
              label='申请加入女神派'
            />
          </section>
        </section>
        <section className='body'>
          <Register />
        </section>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
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
                path="/register" 
                component={RegisterRoute}
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
