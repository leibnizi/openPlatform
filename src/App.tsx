import * as React from 'react';
import './App.less';
import { connect } from 'react-redux'
import { Layout } from "antd";
import { Navigation } from "../src/components/navigation/Navigation";
import { LeftMenu } from '../src/components/leftMenu/LeftMenu';
import { RouteType, SiderType } from "../src/types/RouteConfigType.d";
import './styles/common.less'

const { Header, Sider, Content } = Layout;

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
    console.log("Will", props)
    this.getSideByPath(props)
  }

  render() {
    const basePath = `/${this.props.routing.location.pathname.split('/')[1]}`
    const siderContent = this._sider === null ? null : (
      <Sider className="leftMenu" >
        <LeftMenu sider={this._sider} basePath={basePath} />
      </Sider>)

    return (
      <Layout>
        {/*  className="headerContainer" */}
        <Header>
          <div className="header">
          222
          </div>
          <div className="header-container">
            <div className="logo">
              <img src={require('../src/styles/img/msheader.png')} alt="Logo" />
            </div>
            <div className="content">
              <Navigation routes={this.props.routes} />
            </div>
          </div>
        </Header>
        <Layout className="page">
          {siderContent}
          <Content className="content">
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
// store.subscribe(App)

const mapStateToProps = (initialState: any) => {
  return initialState;
}

export default connect(mapStateToProps)(App)
