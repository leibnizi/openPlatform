import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { ConnectedRouter } from "react-router-redux";
import './styles/App.less';
import store, { history } from './redux/store/store';
import './index.css';
import App from './App';
import { Switch } from 'react-router-dom';
import { routes, registerPage } from '../src/routes/index'
import { RouteType, SiderItem } from './types/RouteConfigType';
import { NotFound } from "./pages/notFound/notFound";
import Splash from './pages/splash/index'
import Login from './pages/splash/login'
import Register from './pages/splash/register'

function createRoutesByConfig(config: Array<RouteType>): Array<any> {
  const routes = config.map((route: RouteType, rIndex: number) => {
    if (route.sider.length !== 0) {
      // 有子菜单,则通过Route render实现nest
      let blockItems: SiderItem[] = []
      route.sider.forEach(sItem => {
        sItem.items.map(item => {
          blockItems.push(item)
        })
      })

      return (
        <Route
          key={rIndex}
          exact={route.exact ? route.exact : false}
          path={route.path}
          render={(match) => {
            return (
              <Switch>
                {
                  [...blockItems.map((bItem: SiderItem, bIndex: number) => {
                    return (
                      <Route
                        exact={true}
                        key={bIndex}
                        path={`${match.match.url}/${bItem.path}`}
                        render={() => {
                          return (
                            <Switch>
                              <Route
                                exact={true}
                                key={bIndex + bItem.title}
                                path={`${match.match.url}/${bItem.path}`}
                                component={bItem.component}
                              />
                              <Route key={'notfound' + bItem.path} component={NotFound} />
                            </Switch>
                          )
                        }}
                      />
                    )
                  }),
                  <Redirect
                    key={"default" + route.path}
                    exact={true}
                    push={true}
                    from={route.path}
                    to={`${route.path}/${route.firstPage}`}
                  />,
                  <Route key={'notfound' + route.path} component={NotFound} />
                  ]
                }
              </Switch>
            )
          }}
        />
      )
    } else {
      // 无子菜单，目前有首页
      return (
        <Route key={rIndex} exact={route.exact ? route.exact : false} path={route.path} component={route.component} />
      )
    }
  })
  return routes;
}

let routesConfig = createRoutesByConfig(routes);

class RegisterRoute extends React.Component {
  render() {
    console.log('store',store.getState())
    return (
      <App routes={registerPage}>
        <Switch>
          <Route key='register' component={Register} />
        </Switch>
      </App>
    )
  }
}

class HomeRoute extends React.Component {
  render() {
    return (
      <App routes={routes}>
        <Switch>
          {
            routesConfig
          }
          <Route key='notfound' component={NotFound} />
        </Switch>
      </App>
    )
  }
}

class AppIndex extends React.Component {
  render() {
    console.log('store',store.getState())
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {
            !0 ? (
              <App routes={routes}>
                <Switch>
                  {
                    routesConfig
                  }
                  <Route key='notfound' component={NotFound} />
                </Switch>
              </App>
            ) : (
                <Router>
                  <div>
                    <Route exact={true} path="/" component={Splash} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={RegisterRoute} />
                    <Route path="/home" component={HomeRoute} />
                  </div>
                </Router>
              )
          }
        </ConnectedRouter>
      </Provider>
    )
  }
}

ReactDOM.render(
  <AppIndex />,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
