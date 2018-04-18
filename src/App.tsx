import * as React from 'react'
import { Layout } from "antd"
import { connect } from 'react-redux'
import { Navigation } from "../src/components/navigation/Navigation";
import { LeftMenu } from '../src/components/leftMenu/LeftMenu';
import { registerPage } from '../src/routes/index'
import { RouteType, SiderType } from "../src/types/RouteConfigType.d"
import './styles/App.less'

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
      this._sider = currentRoute.length > 0 ? currentRoute[0].sider : null
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
    const siderContent = this._sider === null ? null : this._sider.length === 0 ? null : (
      <Sider className="leftMenu" >
        <LeftMenu sider={this._sider} basePath={basePath} />
      </Sider>
    )
    console.log(basePath,"GGG")
    return (
      <div>
      {
        ['/splash','/login'].indexOf(basePath) === -1 ? (
          <Layout className="page">
            <header className="header-container">
              <div className="top">
                222
              </div>
              <div className="header-box">
                <div className="logo">
                  <img src={require('../src/styles/img/msheader.png')} alt="Logo" />
                  <span>商家后台管理系统</span>
                </div>
                <div className="nav-content">
                  <Navigation routes={this.props.routes} />
                </div>
              </div>
            </header>
            <Layout className="content-container">
              {siderContent}
              <Content 
                style={{ background: `${basePath === "/" ? "#f2f2f2" : "#fff"}` }} 
                className="content"
              >
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
        ) : ['/register'].indexOf(basePath) >= 0 ? (
          <Layout className="page">
            <header className="header-container">
              <div className="top">
                222
              </div>
              <div className="header-box">
                <div className="logo">
                  <img src={require('../src/styles/img/msheader.png')} alt="Logo" />
                  <span>商家后台管理系统</span>
                </div>
                <div className="nav-content">
                  <Navigation routes={registerPage} />
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
        ) : (
          <Layout className="login">
            <Layout className="content-container">
              {siderContent}
              <Content 
                className="content"
              >
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
        )
      }
      </div>
    )
  }
}

const mapStateToProps = (initialState: any) => {
  return initialState;
}

export default connect(mapStateToProps)(App)
