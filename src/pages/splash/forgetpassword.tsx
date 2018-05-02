import * as React from 'react'
import { Upload, Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import request from '../../services/httpRequest'
import './forgetpassword.less'

class Forgetpassword extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      phone: '',
      verificationCode: '',
      newpassword: '',
      passwordconfirm: '',
      formValue: null
    }
  }

  // componentDidMount() {
  //   fetchUtil('api/login', { name: '12', mobile: '1221' }).then(v => console.log('login', v))
  // }

  getCaptcha = () => {
    const form = this.props.form
    const mobile = form.getFieldValue('phone')
    request('/api/verification_code', {
      params: { mobile }
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
      if (!value.match('^[\u4E00-\u9FA5A-Za-z0-9]{6,16}$')) {
        callback('6-16位大小写字母或数字');
      }
    }
    callback()
  }

  onSubmit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('Received values of form1: ', values);
      if (!err) {
        this.setState({ formValue: values })
      }
    })
  }

  render() {
    const { phone, verificationCode, newpassword, passwordconfirm } = this.state
    const FormItem = Form.Item;
    const Option = Select.Option;
    const AutoCompleteOption = AutoComplete.Option;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const formItemLayout2 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='forgetpassword'>
        {/* <form onSubmit={(e) => this.onSubmit(e)}>
          <label
            className='name'
          >
            <div className='symbol'>
              *
              <span className='labelName'>
                手机号:
              </span>
            </div>
            <input
              type="text"
              value={phone}
              onChange={(e) => this.setState({ phone: e.target.value })}
            />
          </label>
          <label
            className='mail'
          >
            <div className='symbol'>
              *
              <span className='labelName'>
                验证码:
              </span>
            </div>
            <input type="text" value={verificationCode} onChange={(e) => this.setState({ verificationCode: e.target.value })} />
          </label>
          <label
            className='phone'
          >
            <div className='symbol'>
              *
              <span className='labelName'>
                新密码:
              </span>
            </div>
            <input
              type="text"
              value={newpassword}
              onChange={(e) => this.setState({ newpassword: e.target.value })}
              placeholder='（密码为6-16个字符，由大小写或数字组成）'
            />
          </label>
          <label
            className='verificationCode'
          >
            <div className='symbol'>
              *
              <span className='labelName'>
                确认新密码:
              </span>
            </div>
            <input
              type="text"
              value={passwordconfirm}
              onChange={(e) => this.setState({ passwordconfirm: e.target.value })}
            />
            <span className='vCode'>获取验证码</span>
          </label>
          <input className='submit' type="submit" value="提交" />
        </form> */}
        <Form onSubmit={(e) => this.onSubmit(e)}>
          <FormItem
            {...formItemLayout2}
            label="手机号"
          >
            <Row gutter={8}>
              <Col span={15}>
                {getFieldDecorator('nickname', {
                  rules: [{ required: true, message: 'Please input the captcha you got!' }],
                })(
                  <Input />
                )}
              </Col>
              <Col span={8}>
                <span className='nickname'>(用户名为6-16个字符，不可使用非法字符串)</span>
              </Col>
            </Row>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="验证码"
          >
            <Row gutter={8}>
              <Col span={15}>
                {getFieldDecorator('captcha', {
                  rules: [
                    {
                      required: true, message: '验证码4位数'
                    },
                    {
                      len: 4
                    }
                  ],
                })(
                  <Input />
                )}
              </Col>
              <Col span={8}>
                <Button onClick={this.getCaptcha} type="primary">获取验证码</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="新密码"
          >
            <Row gutter={8}>
              <Col span={15}>
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: 'Please input the captcha you got!'
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(
                  <Input />
                )}
              </Col>
              <Col span={8}>
                <span className='nickname'>(密码为6-16个字符，由大小写字母或数字组成)</span>
              </Col>
            </Row>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认密码"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">提交</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Forgetpassword)