import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import { Route, Redirect } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { ConnectedRouter } from "react-router-redux";
import './styles/App.less';
import store, { history } from './redux/store/store';
import './index.css';
import App from './App';
import { Switch } from 'react-router-dom';
import { routes } from '../src/routes/index'
import { RouteType, SiderItem } from './types/RouteConfigType';
import { NotFound } from "./pages/notFound/notFound";

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

let app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App routes={routes}>
        <Switch>
          {
            routesConfig
          }

          <Route key='notfound' component={NotFound} />
        </Switch>
      </App>
    </ConnectedRouter>
  </Provider>);
console.log(store)
ReactDOM.render(
  app,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
