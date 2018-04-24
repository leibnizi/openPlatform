import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Overview from '../pages/finacial/overview/overview'
import Withdraw from '../pages/finacial/withdraw/withdraw'
import Detail from '../pages/finacial/detail/detail'

export default class Fincial extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <div>
          <div className='aside'>
            <p>财务管理</p>
            <OldMenuLink activeOnlyWhenExact={true} to="/fincial" label="财务总览" />
            <OldMenuLink to="/fincial/withdraw" label="提现明细" />
            <p>对账管理</p>
            <OldMenuLink to="/fincial/detail" label="对账明细" />
          </div>
          <div className='content'>
            <Route exact path="/fincial" component={Overview} />
            <Route path="/fincial/withdraw" component={Withdraw} />
            <Route path="/fincial/detail" component={Detail} />
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
