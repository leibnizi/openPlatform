import * as React from 'react'
import { BrowserRouter, Link } from "react-router-dom"
import { Route, Switch } from 'react-router'
import { Provider } from 'react-redux'
import Splash from './pages/splash'
import Login from './pages/splash/login'
import Register from './pages/splash/register'
import Forgetpassword from './pages/splash/forgetpassword'
import store from './redux/store/store';
import Content from './content'
import './styles/App.less';
//import { message } from 'antd'
// import axios from 'axios';

const EventEmitter = require('events');
export const myEmitter = new EventEmitter()
interface OldMenuLinkType {
  label: string,
  to: string,
  activeOnlyWhenExact: boolean
}

export const OldMenuLink = ({ label, to, activeOnlyWhenExact }: OldMenuLinkType) => (
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

class RegisterRoute extends React.Component {
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
            <section className='navigation'>
              <OldMenuLink
                activeOnlyWhenExact={true}
                to={'/register'}
                label='申请加入女神派'
              />
            </section>

          </div>
        </header>
        <section className='body'>
          <Register />
        </section>
      </div>
    )
  }
}

class PassWordRoute extends React.Component {
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
            <section className='navigation'>
              <OldMenuLink
                activeOnlyWhenExact={true}
                to={'/forgetpassword'}
                label='找回密码'
              />
            </section>

          </div>
        </header>
        <section className='body'>
          <Forgetpassword />
        </section>
      </div>
    )
  }
}

class App extends React.Component {
  componentDidMount() {
    myEmitter.on('event', () => {
      console.log('A!!!!!!!');
    });
  }
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
              path="/forgetpassword"
              component={PassWordRoute}
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
