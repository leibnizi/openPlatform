import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Overview from './overview/overview'
import Withdraw from './withdraw/withdraw'
import Detail from './detail/detail'
import { OldMenuType } from '../../types/oldMenuType'

const OldMenuLink = ({ label, to, activeOnlyWhenExact }: OldMenuType) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <div className={match ? 'active' : 'normal'}>
        <Link to={to}>{label}</Link>
      </div>
    )}
  />
)

export default class Finacial extends React.Component< any, {} > {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <Router>
        <div>
          <div className='aside'>
            <p>财务管理</p>
            <OldMenuLink activeOnlyWhenExact={true} to="/fincial/overview" label="财务总览" />
            <OldMenuLink to="/fincial/withdraw" label="提现明细" />
            <p>对账管理</p>
            <OldMenuLink to="/fincial/detail" label="对账明细" />
          </div>
          <div className='content'>
            <Route path="/fincial/overview" component={Overview} />
            <Route path="/fincial/withdraw" component={Withdraw} />
            <Route path="/fincial/detail" component={Detail} />
          </div>
        </div>
      </Router>
    )
  }
}
