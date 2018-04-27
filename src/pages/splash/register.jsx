import * as React from 'react'
import { Upload, Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import './register.less'
import request from '../../services/httpRequest'
import RegisterNext from './registernext'

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tabIndex: 0,
      name: '',
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
    }
  }

  gotoStep = (e, tabIndex) => {
    e.preventDefault()
    this.setState({ tabIndex })
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
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

  validateNickName = (rule, value, callback) => {
    const form = this.props.form;
    if (value && !value.match('^[\u4E00-\u9FA5A-Za-z0-9_]{6,16}$')) {
      callback('6-16位不包含非法字符串');
    } else {
      callback()
    }
  }

  getCaptcha = () => {
    const form = this.props.form
    const mobile = form.getFieldValue('phone')
    request('/api/verification_code', {
      params: { mobile }
    })
  }

  render() {
    const {
      tabIndex, name, mail, phone, verificationCode, password, confirmPassword,
      biz_name, profit_level, brand, website, category_id, biz_type, biz_operator,
      mobile, email, qq, faxes, biz_address, previewVisible, previewImage, fileList, fileListSupplement,
      autoCompleteResult
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
                        label="邮箱"
                      >
                        {getFieldDecorator('email', {
                          rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                          }, {
                            required: true, message: 'Please input your E-mail!',
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
                          rules: [{ required: true, message: 'Please input your phone number!' }],
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
                              rules: [{ required: true, message: 'Please input the captcha you got!' }],
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
                        label="密码"
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
                        <Button type="primary" htmlType="submit">下一步</Button>
                      </FormItem>
                    </Form>
                  ) : tabIndex === 1 ? (
                    <RegisterNext
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
