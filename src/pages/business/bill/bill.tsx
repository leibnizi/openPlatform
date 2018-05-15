import * as React from "react";
import { Row, Col } from 'antd';
import { connect } from 'react-redux'
import { BillForm } from '../components/billForm/billForm'
import './bill.less'
import { business as businessAction } from '../../../redux/actions/index'
const { getBillInfos, postBillInfos } = businessAction

class Bill extends React.Component<any, any> {
  state = {
    fields: {
      openingBank: {
        value: '',
      },
      account: {
        value: '',
      },
      receiver: {
        value: '',
      },
      status: {
        value: '',
      },
    }
  };

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getBillInfos())
  }

  handleFormChange = (value: any) => {
    const { dispatch } = this.props
    dispatch(postBillInfos({value}))
    // api / finance / index
  }

  render() {
    const { billInfos, billInfos:{ is_exist_audit_data } } = this.props
    return (
      <div className="bill-page">
        <header className="content-title">财务信息</header>
        <Row style={{ display: `${is_exist_audit_data === 0 ? 'block' : 'none'}` }}>
          <Col span={12}>
            <BillForm
              {...billInfos}
              onChange={this.handleFormChange}
            />
          </Col>
        </Row>
        <Row style={{ display: `${is_exist_audit_data === 1 ? 'block' : 'none'}` }} className="message-box">
          <Col span={12}>
            <Row className="message-item">
              <Col className="lable-font-weight bill-label" span={5}>
                开户行：
              </Col>
                <Col span={19}>
                {billInfos.bank}
                </Col>
              </Row>
              <Row className="message-item">
              <Col className="lable-font-weight bill-label" span={5}>
                  收款账号：
                </Col>
                <Col span={19}>
                {billInfos.account}
                </Col>
              </Row>
              <Row className="message-item">
              <Col className="lable-font-weight bill-label " span={5}>
                  收款人：
                </Col>
                <Col span={19}>
                {billInfos.payee}
                </Col>
              </Row>
              <Row className="message-item">
              <Col className="lable-font-weight bill-label " span={5}>
                  信息状态：
                </Col>
                <Col className="lable-font-weight " span={19}>
                  {billInfos.finance_state}
                </Col>
              </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps: any = ({ billInfos, userInfo }: any) => ({
  billInfos,
  userInfo
})

const mapDispatchToProps: any = (dispatch: any) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Bill)