import * as React from 'react'
import { connect } from 'react-redux'
// import { Icon } from 'antd'
import  request from '../../../services/httpRequest'
import './overview.less'

class Overview extends React.Component<any, {}> {

  constructor(props: any) {
    super(props)

    this.state = {
      overviewdata: false
    }
  }

  componentDidMount() {
    const token = this.props.state.userInfo.token
    fetch(`/api/financial/financial_view?token=${token}`)
      .then(res => res.json())
      .then(res => this.setState({ overviewdata: res }))
  }

  applywithdraw = (money: any) => {
    const token = this.props.state.userInfo.token
    request.post(`/api/financial/apply?token=${token}`, { balance_available: 1 })
      .then()
  }

  render() {
    const { overviewdata }: any = this.state
    // const antIcon = <Icon className='loading' type="loading" style={{ fontSize: 60 }} spin={true} />;
    return (
      <div className='overview'>
        <p className='overtop'>财务总览</p>
        <div>
          <div className='overviewlist'>
            {
              overviewdata ? (
                Object.keys(overviewdata.data).map((item, index) =>
                  <p className='overviewitem' key={index}> 
                    可提现金额:
                    <span>￥{overviewdata.data[item]}</span>
                  </p>
                )
              ) : (
                Array.from({length:3}).map((item, index) =>
                  <p className='overviewitem' key={index}> 
                    可提现金额:
                    <span>￥</span>
                  </p>
                )
              )
            }
            
          </div>

          <button onClick={() => this.applywithdraw("money")}>申请提现</button>
          <p className='modifyText'>修改财务信息</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps: any = (state: object) => ({
  state: state
})

const mapDispatchToProps: any = (dispatch: any) => ({
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)