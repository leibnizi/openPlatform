import * as React from "react";
import { Row, Col, Button } from 'antd';
import { AccountForm } from '../components/accountForm/accountForm'
import './account.less'
import { business as businessAction } from '../../../redux/actions/index'
const { getAccountInfos } = businessAction
import { connect } from 'react-redux'

class Account extends React.Component<any, any> {
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
  handleFormChange = (value: any) => {
    console.log(value)
  }

  toggleEditFun = () => {
    const { is_edit } = this.state;
    this.setState({
      is_edit: !is_edit
    })
  }
  changePassWord = () => {
    console.log(1)
  }

  componentDidMount() {
    const { dispatch, userInfo: { token } } = this.props
    dispatch(getAccountInfos(token))
  }

  render() {
    const { is_edit } = this.state
    // console.log(this.props,"GG")
    // debugger
    const {accountInfos, accountInfos: {address, email, mobile, name}} = this.props

    return (
      <div className="bill-page">
        <header className="content-title">账务信息</header>
        <Row style={{ display: `${is_edit ? 'block' : 'none'}` }}>
          <Col span={12}>
            <AccountForm
              {...accountInfos}
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
                {name}
              </Col>
            </Row>
            <Row className="message-item">
              <Col span={5}>
                手机号：
              </Col>
              <Col span={19}>
                {mobile}
              </Col>
            </Row>
            <Row className="message-item">
              <Col span={5}>
                邮箱：
              </Col>
              <Col span={19}>
                {email}
              </Col>
            </Row>
            <Row className="message-item">
              <Col span={5}>
                地址：
              </Col>
              <Col span={19}>
                {address}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ display: is_edit ? 'none' : 'block'}} className="edit_btn">
          <Col span={5}>
            <Button onClick={() => this.toggleEditFun()}>
              修改账户信息
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

const mapStateToProps: any = ({ accountInfos, userInfo }: any) => ({
  accountInfos,
  userInfo
})

const mapDispatchToProps: any = (dispatch: any) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)