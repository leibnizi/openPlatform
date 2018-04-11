import * as React from 'react';
import './App.less';
import { connect } from 'react-redux'
import { Layout } from "antd";

const { Header, Sider, Content } = Layout;

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    console.log("App props :", props)
  }

  render() {
    return (
      <Layout>
        <Header>
          This is Header
        </Header>
        <Layout className="page">
          <Sider className="leftMenu">
            This is Sider
          </Sider>
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
