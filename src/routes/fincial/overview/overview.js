import React, { Component } from 'react';
import { Spin, Icon } from 'antd';
import {fetchUtil} from '../../../service/api'
import './overview.less'  

export default class Overview extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      overviewdata: false
    }
  }
  
  componentDidMount() {
    fetchUtil('/api/financial/apply', {balance_available:100})
    fetch('/api/financial/financial_view').then(res=>res.json()).then(res=>this.setState({overviewdata:res}))
  }

  render() {
    const { overviewdata } = this.state
    const antIcon = <Icon className='loading' type="loading" style={{ fontSize: 60 }} spin />;
    console.log('voverviewdata',overviewdata)
    return (
      <div>
        <p>总览</p>
        {/* {
          overviewdata ? (
              Object.keys(overviewdata.data).map((item,index)=>
                <p key={index}> 可提现金额:{overviewdata.data[item]}</p>
              )
          ) : <Spin indicator={antIcon} />
        } */}
        <Spin indicator={antIcon} />
      </div>
    )
  }
};
