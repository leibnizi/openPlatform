import * as React from 'react'
import { Upload, Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import './register.less'
import request from '../../services/httpRequest'
import RegisterNext from './registernext'
import { stat } from 'fs';

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tabIndex: 0,
      formNext: null,
      mail: '',
      phone: '',
      verificationCode: '',
      password: '',
      confirmPassword: '',
      biz_name: '',
      website: '',
      brand: '',
      category_id: '',
      biz_type: '',
      biz_operator: '',
      mobile: '',
      email: '',
      qq: '',
      faxes: '',
      biz_address: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
      fileListSupplement: [],
      confirmDirty: false,
      autoCompleteResult: [],
      second: 60,
      verificationShow: false
    }
  }

  gotoStep = (e, tabIndex) => {
    e.preventDefault()

    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('Received values of form1: ', values);
      if (tabIndex === 0 || !err) {
        this.setState({ tabIndex, formNext: values })
      }
    })
  }

  handleChange = (fileList) => this.setState({ fileList: fileList.fileList })

  handleChangeList = (fileList) => this.setState({ fileListSupplement: fileList.fileList })

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
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

  //昵称
  validateNickName = (rule, value, callback) => {
    const form = this.props.form;
    if (value && !value.match('^[\u4E00-\u9FA5A-Za-z0-9_]{6,16}$')) {
      callback('6-16位不包含非法字符串');
    } else {
      callback()
    }
  }

  validateMobile = (rule, value, callback) => {
    if (value && !(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
      callback('请输入正确格式手机号码，之后才能获取验证码！')
      this.setState({ verificationShow: false })
    } else {
      callback()
      this.setState({ verificationShow: true })
    }
  }

  getCaptcha = () => {
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

  render() {
    const {
      tabIndex, mail, phone, verificationCode, password, confirmPassword,
      biz_name, profit_level, brand, website, category_id, biz_type, biz_operator,
      mobile, email, qq, faxes, biz_address, previewVisible, previewImage, fileList, fileListSupplement,
      autoCompleteResult, second, verificationShow
    } = this.state
    const { getFieldDecorator } = this.props.form;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
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

    return (
      <section className='registerOut'>
        {
          tabIndex === 2 ? (
            <div className='register'>
              <section className='registerSuccess'>
                <img src={require('../../styles/img/registerend.png')} />
                <div>
                  <p className='p1'>提交成功!</p>
                  <p className='p2'>审核时间需要5-20个工作日</p>
                  <p className='p2'>如有疑问,可联系客服</p>
                </div>

              </section>
            </div>
          ) : (
              <div className='register'>
                <header>
                  <span
                    className={tabIndex === 0 ? 'registerActive headerfont' : 'registernormal headerfont'}
                  >
                    {
                      tabIndex === 0 ? (
                        <img src={require('../../styles/img/number1.png')} />
                      ) : (
                          <img src={require('../../styles/img/unnumber1.png')} />
                        )
                    }
                    创建账户
                  </span>
                  <span
                    className={tabIndex === 1 ? 'registerActive' : 'registernormal'}
                  >
                    {
                      tabIndex === 1 ? (
                        <img src={require('../../styles/img/number2.png')} />
                      ) : (
                          <img src={require('../../styles/img/unnumber2.png')} />
                        )
                    }
                    填写商家信息
                </span>
                </header>
                <hr />
                {
                  tabIndex === 0 ? (
                    <Form onSubmit={(e) => this.gotoStep(e, 1)}>
                      <FormItem
                        {...formItemLayout2}
                        label="用户名"
                      >
                        <Row gutter={8}>
                          <Col span={15}>
                            {getFieldDecorator('nickname', {
                              rules: [
                                {
                                  required: true, message: '请输入你的用户名!'
                                },
                                {
                                  validator: this.validateNickName,
                                }
                              ],
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
                        label="邮箱"
                      >
                        {getFieldDecorator('email', {
                          rules: [{
                            type: 'email', message: '无效的E-mail地址!',
                          }, {
                            required: true, message: '请输入你的E-mail!',
                          }],
                        })(
                          <Input />
                        )}
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="手机号"
                      >
                        {getFieldDecorator('phone', {
                          rules: [
                            {
                              required: true, message: '请输入你的手机号码!'
                            },
                            {
                              validator: this.validateMobile,
                            }
                          ],
                        })(
                          <Input style={{ width: '100%' }} />
                        )}
                      </FormItem>
                      <FormItem
                        {...formItemLayout2}
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
                            {
                              second !== 60 ? <Button disabled>{second}s之后重新获取</Button> : (
                                verificationShow ? <Button onClick={this.getCaptcha} type="primary">获取验证码</Button> :
                                <Button disabled type="primary">获取验证码</Button>
                              )
                            }
                          </Col>
                        </Row>
                      </FormItem>
                      <FormItem
                        {...formItemLayout2}
                        label="密码"
                      >
                        <Row gutter={8}>
                          <Col span={15}>
                            {getFieldDecorator('password', {
                              rules: [{
                                required: true, message: '请输入密码!'
                              }, {
                                validator: this.validateToNextPassword,
                              }],
                            })(
                              <Input type="password" />
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
                            required: true, message: '请确认你的密码!',
                          }, {
                            validator: this.compareToFirstPassword,
                          }],
                        })(
                          <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                      </FormItem>
                      <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">下一步</Button>
                      </FormItem>
                    </Form>
                  ) : tabIndex === 1 ? (
                    <RegisterNext
                      formNext={this.state.formNext}
                      gotoStep={(e, num) => this.gotoStep(e, num)}
                    />
                  ) : (
                        null
                      )
                }

              </div>
            )
        }

        {/* <form onSubmit={(e) => this.loginin(e)}>
          <label
            className='id'
          >
            账户
            <input type="text" value={this.state.value} onChange={(e) => this.handleChangeId(e.target.value)} />
          </label>
          <label
            className='password'
          >
            密码
            <input type="text" value={this.state.value} onChange={(e) => this.handleChangePass(e.target.value)} />
          </label>
          <p>忘记密码？</p>
          <input className='submit' type="submit" value="登录" />
        </form> */}
      </section>
    )
  }
};

export default Form.create()(Register)
