import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Product from './productlist/product'
import Lease from './lease/lease'
import Sale from './sale/sale'
import AfterSale from './afterSale/afterSale'
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

export default class Operation extends React.Component {
  constructor(props: any) {
    super(props)
  }

  render() {

    return (
      <Router>
        <div>
          <div className="aside">
            <p> 商品管理 </p>
            <OldMenuLink activeOnlyWhenExact={true} to="/operation/product" label="商品列表" />
            <p>订单管理</p>
            <OldMenuLink to="/operation/lease" label="租赁订单" />
            <OldMenuLink to="/operation/sale" label="销售订单" />
            <p>售后管理</p>
            <OldMenuLink to="/operation/afterSale" label="售后订单" />
          </div>
          <div className='content'>
            <Route path="/operation/product" component={Product} />
            <Route path="/operation/lease" component={Lease} />
            <Route path="/operation/sale" component={Sale} />
            <Route path="/operation/afterSale" component={AfterSale} />
          </div>
        </div>
      </Router>
    )
  }
}
