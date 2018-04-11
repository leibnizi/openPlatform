import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import { Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { ConnectedRouter } from "react-router-redux";
import './styles/App.less';
import store, { history } from './redux/store/store';
import { operationRoutes } from '../src/routes/operation'
import operation from '../src/pages/operation/index';
import Home from '../src/pages/home/index'
import './index.css';
import Lease from './pages/operation/lease';
import App from './App';
import { Switch } from 'react-router-dom';
import afterSale from '../src/pages/operation/afterSale';

function createRoutesByConfig(config: any) {
  if (config.subRoutes && config.subRoutes.length > 0) {
    return (
      <Route path={config.path}>
        {config.subRoutes.map((subItem: any, index: number) => {
          return subItem.items.map((item: any, iIndex: number) => {
            return <Route key={iIndex} path={item.path} component={item.component} />
          })
        })}
      </Route>)
  } else {
    return (
      <Route path={config.path} component={config.component} />
    )
  }
}

let routes = createRoutesByConfig(operationRoutes);
console.log("Routes", routes)

let app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Route exact={true} path="/" component={Home} />
        <Route
          path="/operation"
          render={(match) => {
            return (
              <Switch>
                <Route path={`${match.match.url}/product`} component={operation}/>
                <Route path={`${match.match.url}/lease`} component={Lease}/>
                <Route path={`${match.match.url}/afterSale`} component={afterSale}/>
              </Switch>
            )
          }}
        />

      </App>
    </ConnectedRouter>
  </Provider>);
console.log(store)
ReactDOM.render(
  app,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
