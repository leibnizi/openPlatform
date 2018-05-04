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
    },
    is_edit: false
  };

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getBillInfos())
  }

  componentWillReceiveProps(nextProps:any) {
    const {billInfos} = nextProps
    if (!billInfos.bank ) {
      this.setState({
        is_edit: true
      });
    }
  }

  handleFormChange = (value: any) => {
    const { dispatch } = this.props
    dispatch(postBillInfos({value}))
    // api / finance / index
  }

  toggleEditFun = () =>  {
    const { is_edit } = this.state;
    console.log(is_edit,"Ee")
    this.setState({
      is_edit: !is_edit
    })
  }

  render() {
    const { billInfos } = this.props
    const { is_edit } = this.state
    return (
      <div className="bill-page">
        <header className="content-title">账务信息</header>
        <Row style={{ display: `${is_edit ? 'block' : 'none'}` }}>
          <Col span={12}>
            <BillForm
              {...billInfos}
              onChange={this.handleFormChange}
            />
          </Col>
        </Row>
        <Row style={{ display: `${!is_edit ? 'block' : 'none'}` }} className="message-box">
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
        {/* <Row className="edit_btn">
          <Col >
            <Button onClick={()=>this.toggleEditFun()}>
              {is_edit ? '保2存' : '编辑财务信息'}
            </Button>
          </Col>
        </Row> */}
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