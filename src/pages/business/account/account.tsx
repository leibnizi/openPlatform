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
        address: {
          value: '',
        },
      },
      is_edit: false,
      confirmLoading: false
    };
  }
  
  handleFormChange = (value: any) => {
    const { dispatch, userInfo: { token } } = this.props
    dispatch(postAccountInfos({
      value,
      token
    }))
  }

  toggleEditFun = () => {
    const { is_edit } = this.state;
    this.setState({
      is_edit: !is_edit
    })
  }

  showChangePassWord = () => {
    // this.setState({
    //   showChangePassWord: true
    // })
    const { dispatch } = this.props
    // dispatch())
    dispatch({
      type: 'SHOW_ACCOUNT_MOBLE',
    })
    // showModal
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

  saveAcccountFun = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, value: any) => {
      if (!err) {
        const { dispatch, userInfo: { token } } = this.props
        dispatch(saveAccountPassword({
          token,
          value
        }))
      }
    });
    return false
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getAccountInfos())
  }

  componentWillReceiveProps(nextProps:any) {
    // debugger
    // this.setState({
    //   showModal: nextProps.showModal
    // })
  }
  cancelEdit = () => {
    this.setState({
      is_edit: false
    })
  }

  render() {
    const { is_edit, confirmLoading } = this.state
    const { accountInfos, showModal, accountInfos: { address, email, mobile, name } } = this.props
    const { getFieldDecorator } = this.props.form;
    // getFieldsError, getFieldError, isFieldTouched

    return (
      <div className="bill-page">
        <header className="content-title">账务信息</header>
        <Row style={{ display: `${is_edit ? 'block' : 'none'}` }}>
          <Col span={12}>
            <AccountForm
              {...accountInfos}
              onChange={this.handleFormChange}
              cancelEdit={this.cancelEdit}
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
        <Row style={{ display: is_edit ? 'none' : 'block' }} className="edit_btn">
          <Col span={5}>
            <Button onClick={() => this.toggleEditFun()}>
              修改账户信息
            </Button>
          </Col>
          <Col span={5}>
            <Button onClick={() => this.showChangePassWord()}>
              修改密码
            </Button>
          </Col>
        </Row>
        <Modal
          title="修改密码"
          visible={showModal}
          onOk={() => this.changePassWord()}
          onCancel={() => this.handleCancel()}
          confirmLoading={confirmLoading}
          bodyStyle={{ height: 'auto' }}
          footer={null}
          destroyOnClose={true}
        >
          <Form
            onSubmit={this.saveAcccountFun}
          >
            <FormItem
              className="modal-form-item"
            >
              {getFieldDecorator('old_password', {
                rules: [{ required: true, message: '请输入原始密码!' }],
                validateTrigger: 'onSubmit'
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码" />
              )}
            </FormItem>
            <FormItem
              className="modal-form-item"
            >
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请输入新密码!' },
                  // { validator: this.handleConfirmPassword },
                  { min: 6, message: '密码长度不足6位' }
                ],
                validateTrigger: 'onSubmit'
              })(
                <Input
                  type="password"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入新密码"
                />
              )}
            </FormItem>
            <FormItem
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
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                  placeholder="请确认密码" 
                />
              )}
            </FormItem>
            <div className="account-btn-box">
              <Button onClick={this.handleCancel} style={{ marginRight: "13px" }}>
                取消
              </Button>
              <Button htmlType="submit">
                保存
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps: any = ({ accountInfos, userInfo, showModal }: any) => {
  return {
    accountInfos,
    userInfo,
    showModal,
  }
}

const mapDispatchToProps: any = (dispatch: any) => ({
  dispatch
})

// export default connect(mapStateToProps, mapDispatchToProps)(Account)
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Account))