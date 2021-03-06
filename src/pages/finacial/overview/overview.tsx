import * as React from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'antd';
import request from '../../../services/httpRequest'
import './overview.less'

class Overview extends React.Component<any, any> {

  constructor(props: any) {
    super(props)

    this.state = {
      overviewdata: null,
      visible: false,
      modify: true
    }
  }

  componentDidMount() {
    request('/api/financial/financial_view')
      .then(res => {
        if (res) {
          this.setState({ overviewdata: res })
        }
      })
    request('/api/finance/index')
      .then(res => {
        if (res.data.bank) {
          this.setState({ modify: false })
        } else if (!res.data.bank) {
          this.setState({ modify: true })
        }
      })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  offModal = () => {
    this.setState({
      visible: false,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    })
    this.props.history.push('/fincial/detail')
  }

  handleWidthdraw = (e) => {
    const { overviewdata } = this.state
    this.setState({
      visible: false,
    });
    request.post(`/api/financial/apply`, { balance_available: overviewdata.data.balance_available })
      .then((res: any) => {
        if (res.status_code === 0) {
          this.setState({ overviewdata: res })
          const modal = Modal.success({
            // title: 'This is a notification message',
            content: '申请成功，如有疑问请联系对接人',
          });
          setTimeout(() => modal.destroy(), 1000);
        }
      })
  }

  render() {
    const { overviewdata, modify }: any = this.state
    // const antIcon = <Icon className='loading' type="loading" style={{ fontSize: 60 }} spin={true} />;
    return (
      <div className='overview'>
        <p className='overtop'>财务总览</p>
        <div>
          <div className='overviewlist'>
            <p className='overviewitem'>
              <span className='overviewitemfont'>可提现金额:</span>
              <span>￥{overviewdata && overviewdata.data.balance_available}</span>
            </p>
            <p className='overviewitem'>
              <span className='overviewitemfont'>累计提现:</span>
              <span>￥{overviewdata && overviewdata.data.balance_total}</span>
            </p>
            <p className='overviewitem'>
              <span className='overviewitemfont'>累计收益:</span>
              <span>￥{overviewdata && overviewdata.data.income_total}</span>
            </p>
          </div>
          <Button
            type="primary"
            onClick={() => {
              this.setState({ visible: true })
            }}
          >
            申请提现
          </Button>
          <Modal
            visible={this.state.visible}
            onCancel={this.offModal}
            wrapClassName="overview-modal"
            footer={[
              <Button key="back" onClick={this.handleWidthdraw}>
                确认申请提现
              </Button>,
              <Button key="submit" type="primary" onClick={this.handleOk}>
                查看对账明细
              </Button>,
            ]}
          >
            <p>提现前请确认查看对账单</p>
          </Modal>
          {
            modify && <p
                className='modifyText'
                onClick={() => window.location.href = window.location.origin + '/business/bill'}
              >
                修改财务信息
            </p>
          }
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
