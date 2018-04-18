import * as React from "react";
import { Row, Col, Button } from 'antd';
// const TabPane = Tabs.TabPane;
import { AccountForm } from '../components/accountForm/accountForm'
import './account.less'

export default class Account extends React.Component<any, any> {
  // constructor(props: any) {
  //   super(props)
  //   this.state = {
  //     // cardList: [1, 2, 3, 4]
  //   }
  // }
  state = {
    fields: {
      username: {
        value: '',
      },
      phone: {
        value: '',
      },
      e_mail: {
        value: '',
      },
      address: {
        value: '',
      },
    },
    is_edit: false
  };
  handleFormChange = (changedFields: any) => {
    this.setState(({ fields }: any) => ({
      fields: { ...fields, ...changedFields },
    }));
  }
  changeTabFun() {

    console.log(1)
  }

  toggleEditFun = () => {
    const { is_edit } = this.state;
    console.log(is_edit, "Ee")
    this.setState({
      is_edit: !is_edit
    })
  }
  changePassWord = () => {
    console.log(1)
  }

  render() {
    const { fields, is_edit } = this.state
    return (
      <div className="bill-page">
        <header className="content-title">账务信息</header>
        <Row style={{ display: `${is_edit ? 'block' : 'none'}` }}>
          <Col span={12}>
            <AccountForm
              {...fields}
              onChange={this.handleFormChange}
            />
          </Col>
        </Row>
        <Row style={{ display: `${!is_edit ? 'block' : 'none'}` }} className="message-box">
          <Col span={12}>
            <Row className="message-item">
              <Col span={5}>
                用户名：
              </Col>
              <Col span={19}>
                {fields.username.value}
              </Col>
            </Row>
            <Row className="message-item">
              <Col span={5}>
                手机号：
              </Col>
              <Col span={19}>
                {fields.phone.value}
              </Col>
            </Row>
            <Row className="message-item">
              <Col span={5}>
                邮箱：
              </Col>
              <Col span={19}>
                {fields.e_mail.value}
              </Col>
            </Row>
            <Row className="message-item">
              <Col span={5}>
                地址：
              </Col>
              <Col span={19}>
                {fields.address.value}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="edit_btn">
          <Col span={5}>
            <Button onClick={() => this.toggleEditFun()}>
              {is_edit ? '保存' : '修改账户信息'}
            </Button>
          </Col>
          <Col span={5}>
            <Button onClick={() => this.changePassWord()}>
              修改密码
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
