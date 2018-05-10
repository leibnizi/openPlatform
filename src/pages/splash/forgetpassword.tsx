import * as React from 'react'
import { Upload, Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message } from 'antd';
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
      formValue: null,
      second: 60,
      verificationShow: false,
      passwordShow: true
    }
  }

  // componentDidMount() {
  //   fetchUtil('api/login', { name: '12', mobile: '1221' }).then(v => console.log('login', v))
  // }

  getCaptcha = () => {
    const { second } = this.state
    const form = this.props.form
    const mobile = form.getFieldValue('phone')
    request('/api/verification_code', {
      params: { mobile }
    })
    const siv = setInterval(() => {
      this.setState({ second: this.state.second - 1 })
      if (this.state.second < 0) {
        this.setState({ second: 60 })
        clearInterval(siv)
      }
    }, 1000)
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一致!')
    } else {
      callback()
    }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  captchalen = (rule, value, callback) => {
    if (value && (!value.match('^[0-9]*$') || value.length !== 4)) {
      callback('验证码长度4位,且只能为数字')
    } else if (!value) {
      callback()
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    if (value && !value.match('^[\u4E00-\u9FA5A-Za-z0-9]{6,16}$') && !value.match('[\u4e00-\u9fa5]{3,8}')) {
      callback('6-16位大小写字母或数字')
      this.setState({ passwordShow: false })
    } else {
      callback()
    }
  }

  onSubmit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      // console.log('Received values of form1: ', values)
      this.setState({ passwordShow: false })
      if (!err) {
        this.setState({ formValue: values })
        request.post('/api/forget/pwd', {
          mobile: values.phone,
          password: values.password,
          password_confirmation: values.confirm,
          verification_code: values.captcha
        })
          .then((res:any) => {
            if (res.status_code === 0) {
              message.success(res.msg)
            }
          })
      }
    })
  }

  validateMobile = (rule, value, callback) => {
    if (value && !(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
      callback('请输入正确格式手机号码，之后才能获取验证码！')
      this.setState({ verificationShow: false })
    } else if (!value) {
      callback()
      this.setState({ verificationShow: false })
    } else {
      callback()
      this.setState({ verificationShow: true })
    }
  }

  render() {
    const { phone, verificationCode, newpassword, passwordconfirm, second, verificationShow, passwordShow } = this.state
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
          offset: 8,
        },
        sm: {
          span: 16,
          offset: 10,
        },
      },
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='forgetpassword'>
        <Form onSubmit={(e) => this.onSubmit(e)} className='registerForm'>
          <FormItem
            {...formItemLayout2}
            label="手机号"
          >
            <Row gutter={8}>
              <Col span={15}>
                {getFieldDecorator('phone', {
                  rules: [
                    {
                      required: true, message: '请输入手机号码!'
                    },
                    {
                      validator: this.validateMobile,
                    }
                  ],
                })(
                  <Input />
                )}
              </Col>
            </Row>
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="验证码"
            className="captcha"
          >
            <Row gutter={8}>
              <Col span={15}>
                {getFieldDecorator('captcha', {
                  rules: [
                    {
                      required: true, message: '验证码长度4位,且只能为数字'
                    },
                    {
                      validator: this.captchalen,
                    }
                  ],
                })(
                  <Input />
                )}
              </Col>
              <Col span={9}>
                {
                  second !== 60 ? <Button disabled>{second}s之后重新获取</Button> :
                    (
                      verificationShow ? <Button className="captchaButton" onClick={this.getCaptcha} type="primary">获取验证码</Button> :
                        <Button disabled className="captchaButton" type="primary">获取验证码</Button>
                    )
                }
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
                    required: true, message: '请输入新密码!'
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(
                  <Input type="password" />
                )}
              </Col>
              <Col span={8}>
                {
                  passwordShow && <span className='nickname'>(密码为6-16个字符，由大小写字母或数字组成)</span>
                }
              </Col>
            </Row>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认新密码"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请确认密码!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button className='forgetSubmit' type="primary" htmlType="submit">提交</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Forgetpassword)