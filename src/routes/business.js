import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Layout, Menu } from 'antd';
// import BsControl from './BsControl'

const { Item } = Menu;
const { Content, Sider } = Layout;

export default class Business extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <Router>
        <div>
          <div className='aside'>
            <p>商家信息</p>
            <OldMenuLink activeOnlyWhenExact={true} to="/business/bsInfo" label="商家信息" />
            <OldMenuLink to="/business/aptitude" label="资质管理" />
            <p>账户管理</p>
            <OldMenuLink to="/operation/finance" label="财务信息" />
            <OldMenuLink to="/operation/sale" label="账户信息" />
            <OldMenuLink to="/operation/sale" label="续约管理" />
          </div>
          <div className='content'>
            {/* <Route exact path="/business/home" component={BsControl} /> */}
          </div>
        </div>
      </Router>
    )
  }
}

const OldMenuLink = ({ label, to, activeOnlyWhenExact }) => (
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


