import * as React from 'react'
import { Layout } from "antd"
import { connect } from 'react-redux'
import { Navigation } from "../src/components/navigation/Navigation";
import { LeftMenu } from '../src/components/leftMenu/LeftMenu';
import { RouteType, SiderType } from "../src/types/RouteConfigType.d"
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'remote-redux-devtools';
// import createSagaMiddleware from 'redux-saga';
// import { Provider } from 'react-redux';
// import reducer from './redux/reducers';
// import rootSaga from './redux/sagas'
// import routes from './routes';
import './styles/App.less'

// import { PageLayout } from './Layout'
// import UserHead from './pages/head/userhead'

const { Sider, Content } = Layout;

interface AppModel {
  _sider: SiderType[] | null;
  getSideByPath(props: AppProps): any;
}

interface AppProps {
  routes: RouteType[];
  routing?: any;
}

class App extends React.Component<AppProps, any> implements AppModel {

  _sider: SiderType[] | null;

  getSideByPath(props: AppProps) {
    if (props.routing && (props.routing.location.pathname.length > 1)) {
      let currentPathBase = `/${props.routing.location.pathname.split('/')[1]}`;
      let currentRoute = props.routes.filter(item => {
        return item.path === currentPathBase
      })
      this._sider = currentRoute.length > 0? currentRoute[0].sider : null
    } else {
      this._sider = null;
    }
  }

  constructor(props: AppProps) {
    super(props)
    this.getSideByPath(props)
  }

  componentWillReceiveProps(props: AppProps) {
    this.getSideByPath(props)
  }

  render() {
    const basePath = `/${this.props.routing.location.pathname.split('/')[1]}`
    const siderContent = this._sider === null ? null : (
      <Sider className="leftMenu" >
        <LeftMenu sider={this._sider} basePath={basePath} />
      </Sider>)

    return (
      <Layout className="page">
        <header className="header-container">
          <div className="top">
            222
          </div>
          <div className="header-box">
            <div className="logo">
              <img src={require('../src/styles/img/msheader.png')} alt="Logo" />
            </div>
            <div className="nav-content">
              <Navigation routes={this.props.routes} />
            </div>
          </div>
        </header>
        <Layout className="content-container">
          {siderContent}
          <Content className="content">
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (initialState: any) => {
  return initialState;
}

export default connect(mapStateToProps)(App)
