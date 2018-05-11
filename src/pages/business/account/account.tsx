import * as React from "react";
import { Row, Col, Button, Modal, Form, Input, Icon } from 'antd';
import { AccountForm } from '../components/accountForm/accountForm'
import './account.less'
import { business as businessAction } from '../../../redux/actions/index'
const { getAccountInfos, postAccountInfos, saveAccountPassword } = businessAction
import { connect } from 'react-redux'

const FormItem = Form.Item;

class Account extends React.Component<any, any> {
  constructor(props:any) {
    super(props)
    this.state = {
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
      },
      confirmLoading: false
    };
  }
  
  saveAccountAccountFun = (value: any) => {
    const { dispatch } = this.props
    dispatch(postAccountInfos(value))
  }

  showEditFun = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'SHOW_ACCOUNT_ACCOUNT_MOBLE',
    })
  }

  showChangePassWord = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'SHOW_ACCOUNT_PASSWORD_MOBLE',
    })
  }

  handleCancel = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'HIDE_ACCOUNT_MOBLE',
    })
  }

  changePassWord = () => {
    
  }
  handleConfirmPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致!');
    } else {
      callback();
    }
  }

  saveAccountPasswordFun = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, value: any) => {
      if (!err) {
        const { dispatch } = this.props
        dispatch(saveAccountPassword(value))
      }
    });
    return false
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getAccountInfos())
    // dispatch(getAroductCategory())
  }

  componentWillReceiveProps(nextProps:any) {
  }
  cancelEdit = () => {
    // this.setState({
    //   is_edit: false
    // })
  }

  render() {
    const { confirmLoading } = this.state
    const { accountInfos, showPasswordModal, showAccountModal, accountInfos: { email, mobile, name } } = this.props
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        // xs: { span: 24 },
        lg: { span: 4 },
        md: { span: 4 },
      },
      wrapperCol: {
        // xs: { span: 24 },
        lg: { span: 20 },
        md: { span: 20 },
      },
    };
    // getFieldsError, getFieldError, isFieldTouched

    return (
      <div className="bill-page">
        <header className="content-title">账户信息</header>
        <Row className="message-box">
          <Col span={12}>
            <Row className="message-item">
              <Col className="acount-lable lable-font-weight" span={5}>
                用户名：
              </Col>
              <Col span={19}>
                {name}
              </Col>
            </Row>
            <Row className="message-item">
              <Col className="acount-lable lable-font-weight" span={5}>
                手机号：
              </Col>
              <Col span={19}>
                {mobile}
              </Col>
            </Row>
            <Row className="message-item">
              <Col className="acount-lable lable-font-weight" span={5}>
                邮箱：
              </Col>
              <Col span={19}>
                {email}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="edit_btn">
          <Col span={5}>
            <Button style={{width: "150px"}}  type="primary" onClick={() => this.showEditFun()}>
              修改账户信息
            </Button>
          </Col>
          <Col span={5}>
            <Button style={{ width: "150px" }}  type="primary" onClick={() => this.showChangePassWord()}>
              修改密码
            </Button>
          </Col>
        </Row>
        <Modal
          title="修改密码"
          visible={showPasswordModal}
          onOk={() => this.changePassWord()}
          onCancel={() => this.handleCancel()}
          confirmLoading={confirmLoading}
          bodyStyle={{ height: 'auto' }}
          footer={null}
          destroyOnClose={true}
        >
          <Form
            onSubmit={this.saveAccountPasswordFun}
            // layout="inline"
          >
            <FormItem
              label="原始密码"
              className="modal-form-item"
              {...formItemLayout}
            >
              {getFieldDecorator('old_password', {
                rules: [
                  { required: true, message: '请输入原始密码!' },
                  { min: 6, message: '密码长度不足6位' }
                ],
                validateTrigger: 'onSubmit'
              })(
                <Input type="password"  placeholder="请输入密码" />
              )}
            </FormItem>
            <FormItem
              label="新密码"
              className="modal-form-item"
              {...formItemLayout}
            >
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请输入新密码!' },
                  { min: 6, message: '密码长度不足6位' }
                ],
                validateTrigger: 'onSubmit'
              })(
                <Input
                  type="password"
                  
                  placeholder="请输入新密码"
                />
              )}
            </FormItem>
            <FormItem
              label="确认密码"
              {...formItemLayout}
              className="modal-form-item"
            >
              {getFieldDecorator('password_confirmation', {
                rules: [{
                  required: true, message: '请确认新密码!'
                }, {
                  validator: this.handleConfirmPassword,
                }, {
                  min: 6,
                  message: '密码长度不足6位'
                }],
                validateTrigger: 'onSubmit'
              })(
                <Input 
                  type="password" 
                   
                  placeholder="请确认密码" 
                />
              )}
            </FormItem>
            <div className="account-btn-box">
              {/* <Button onClick={this.handleCancel} style={{ marginRight: "13px" }}>
                取消
              </Button> */}
              <Button htmlType="submit">
                保存
              </Button>
            </div>
          </Form>
        </Modal>
        <Modal
          title="修改账户信息"
          visible={showAccountModal}
          confirmLoading={confirmLoading}
          bodyStyle={{ height: 'auto' }}
          onCancel={() => this.handleCancel()}
          footer={null}
          destroyOnClose={true}
        >
          <AccountForm
            {...accountInfos}
            onChange={this.saveAccountAccountFun}
            cancelEdit={this.handleCancel}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps: any = ({ accountInfos, userInfo, showPasswordModal, showAccountModal }: any) => {
  return {
    accountInfos,
    userInfo,
    showPasswordModal,
    showAccountModal
  }
}

const mapDispatchToProps: any = (dispatch: any) => ({
  dispatch
})

// export default connect(mapStateToProps, mapDispatchToProps)(Account)
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Account))