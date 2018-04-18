import * as React from 'react';
import { Spin, Icon } from 'antd';
import { fetchUtil } from '../../../services/httpRequest'
import './overview.less'

export default class Overview extends React.Component<any, {} > {

  constructor(props: any) {
    super(props)

    this.state = {
      overviewdata: false
    }
  }

  componentDidMount() {
    fetch('/api/financial/financial_view').then(res => res.json()).then(res => this.setState({ overviewdata: res }))
  }

  applywithdraw = (money: any) => {
    fetchUtil('/api/financial/apply', { balance_available: money })
      .then()
  }

  render() {
    const { overviewdata }: any = this.state
    const antIcon = <Icon className='loading' type="loading" style={{ fontSize: 60 }} spin={true} />;
    console.log('voverviewdata', overviewdata)
    return (
      <div className='overview'>
        <p className='overtop'>财务总览</p>
        <div>
          <div className='overviewlist'>
          {
            overviewdata ? (
              Object.keys(overviewdata.data).map((item, index) =>
                <p className='overviewitem' key={index}> 可提现金额:<span>￥{overviewdata.data[item]}</span></p>
              )
            ) : <Spin indicator={antIcon} />
          }
          </div>
          
          <button onClick={() => this.applywithdraw("money")}>申请提现</button>
          <p className='modifyText'>修改财务信息</p>
        </div>
      </div>
    )
  }
};
