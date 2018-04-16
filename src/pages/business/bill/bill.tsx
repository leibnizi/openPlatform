import * as React from "react";
import { Row, Col, Button } from 'antd';
// const TabPane = Tabs.TabPane;
import { BillForm } from '../components/billForm/billForm'
import './bill.less'

export default class Bill extends React.Component<any, any> {
  // constructor(props: any) {
  //   super(props)
  //   this.state = {
  //     // cardList: [1, 2, 3, 4]
  //   }
  // }
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
  handleFormChange =(changedFields:any) => {
    this.setState(({ fields }: any) => ({
      fields: { ...fields, ...changedFields },
    }));
  }
  changeTabFun() {

    console.log(1)
  }

  toggleEditFun = () =>  {
    const { is_edit } = this.state;
    console.log(is_edit,"Ee")
    this.setState({
      is_edit: !is_edit
    })
  }

  render() {
    const { fields, is_edit } = this.state
    return (
      <div className="bill-page">
        <Row style={{ display: `${is_edit ? 'block' : 'none'}` }}>
          <Col span={12}>
            <BillForm
              {...fields}
              onChange={this.handleFormChange}
            />
          </Col>
        </Row>
        <Row style={{ display: `${!is_edit ? 'block' : 'none'}` }} className="message-box">
          <Col span={12}>
            <Row className="message-item">
              <Col span={5}>
                开户行：
              </Col>
                <Col span={19}>
                  {fields.openingBank.value}
                </Col>
              </Row>
              <Row className="message-item">
                <Col span={5}>
                  收款账号：
              </Col>
                <Col span={19}>
                  {fields.account.value}
                </Col>
              </Row>
              <Row className="message-item">
                <Col span={5}>
                  收款人：
              </Col>
                <Col span={19}>
                  {fields.receiver.value}
                </Col>
              </Row>
              <Row className="message-item">
                <Col span={5}>
                  信息状态：
              </Col>
                <Col span={19}>
                  {fields.status.value}
                </Col>
              </Row>
          </Col>
        </Row>
        <Row className="edit_btn">
          <Col >
            <Button onClick={()=>this.toggleEditFun()}>
              {is_edit ? '保存' : '编辑财务信息'}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
