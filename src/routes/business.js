import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"
import { Layout, Menu } from 'antd';
// import BsControl from './BsControl'
import Infos from '../pages/business/infos'
import EditInfos from '../pages/business/editInfos/editInfos'
import StatusControl from '../pages/business/statusControl/statusControl'
import Bill from '../pages/business/bill/bill'
import Account from '../pages/business/account/account'


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
            <OldMenuLink to="/business/statusControl" label="资质管理" />
            <p>账户管理</p>
            <OldMenuLink to="/business/bill" label="财务信息" />
            <OldMenuLink to="/business/account" label="账户信息" />
            {/* <OldMenuLink to="/business/renewal" label="续约管理" /> */}
          </div>
          <div className='content'>
            <Route exact path="/business" render={() => <Redirect to="/business/bsInfo" />} />
            <Route exact path="/business/bsInfo" component={Infos} />
            <Route exact path="/business/edit_infos" component={EditInfos} />
            <Route path="/business/statusControl" component={StatusControl} />
            <Route path="/business/bill" component={Bill} />
            <Route path="/business/account" component={Account} />
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