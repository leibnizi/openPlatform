import * as React from 'react';
import { Spin, Icon, Button } from 'antd';
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
      <div>
        <p>总览</p>
        {
          overviewdata ? (
            Object.keys(overviewdata.data).map((item, index) =>
              <p key={index}> 可提现金额:{overviewdata.data[item]}</p>
            )
          ) : <Spin indicator={antIcon} />
        }
        <input />
        <Button onClick={() => this.applywithdraw("money")}>申请提现</Button>
        {/* <Spin indicator={antIcon} /> */}
      </div>
    )
  }
};
