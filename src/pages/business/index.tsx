import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"
import BsControl from './BsControl';
import { OldMenuLink } from "../../components/OldMenuLink";

export default class Business extends React.Component <any, {}> {
  constructor(props:any) {
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
            <Route exact={true} path="/business/home" component={BsControl} />
          </div>
        </div>
      </Router>
    )
  }
}
