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
      isAgreement: true,
      tabIndex: 0,
      formNext: null,
      mail: '',
      phone: '',
      password: '',
      qq: '',
      faxes: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
      fileListSupplement: [],
      confirmDirty: false,
      autoCompleteResult: [],
      second: 60,
      verificationShow: false,
      formValue: null,
      nicknameShow: true,
      passwordShow: true
    }
  }

  gotoStep = (e, tabIndex, formValue) => {
    e.preventDefault()
    if (tabIndex === 0) {
      this.setState({ tabIndex, formValue })
    } else {
      this.props.form.validateFieldsAndScroll((err, values) => {
        this.setState({ nicknameShow: false, passwordShow: false })
        if (!err) {
          this.setState({ tabIndex, formNext: values })
        }
      })
    }
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
      callback('两次密码不一致!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    if (value && !value.match('^[\u4E00-\u9FA5A-Za-z0-9]{6,16}$')) {
      callback('6-16位大小写字母或数字')
      this.setState({ passwordShow: false })
    } else {
      callback()
    }
  }

  //昵称
  validateNickName = (rule, value, callback) => {
    const form = this.props.form;
    if (value && !value.match('^[\u4E00-\u9FA5A-Za-z0-9_]{6,16}$') && !value.match('[\u4e00-\u9fa5]{3,8}')) {
      callback('6-16位不包含非法字符')
      this.setState({ nicknameShow: false })
    } else {
      callback()
    }
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
  //注册协议浮层取消回调
  handleCancel = () => {
    this.setState({ isAgreement: false });
    window.location.href = window.location.origin + '/splash';
  }

  //注册协议浮层确认回调
  handleOk = () => {
    this.setState({ isAgreement: false });
  }

  captchalen = (rule, value, callback) => {
    if (value && value.length !== 4) {
      callback('验证码长度4位')
    } else if (value && !value.match('^[0-9]*$')) {
      callback('验证码只能为数字')
    } else {
      callback()
    }
  }

  render() {
    const {
      tabIndex, mail, phone, password,
      profit_level,
      mobile, qq, faxes, previewVisible, previewImage, fileList, fileListSupplement,
      autoCompleteResult, second, verificationShow, formNext, nicknameShow, passwordShow
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
          offset: 11,
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
                    <Form onSubmit={(e) => this.gotoStep(e, 1)} className='registerForm'>
                      <FormItem
                        {...formItemLayout2}
                        label="用户名"
                      >
                        <Row gutter={8}>
                          <Col span={15}>
                            {getFieldDecorator('nickname', {
                              initialValue: formNext && formNext.nickname,
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
                            {
                              nicknameShow && <span className='nickname'>(用户名为6-16个字符，不可使用非法字符)</span>
                            }
                          </Col>
                        </Row>
                      </FormItem>
                      <FormItem
                        {...formItemLayout2}
                        label="邮箱"
                      >
                        <Row gutter={8}>
                          <Col span={15}>
                            {getFieldDecorator('email', {
                              initialValue: formNext && formNext.email,
                              rules: [{
                                type: 'email', message: '无效的E-mail地址!',
                              }, {
                                required: true, message: '请输入你的E-mail!',
                              }],
                            })(
                              <Input />
                            )}
                          </Col>
                          <Col span={8}>
                          </Col>
                        </Row>
                      </FormItem>
                      <FormItem
                        {...formItemLayout2}
                        label="手机号"
                      >
                        <Row gutter={8}>
                          <Col span={15}>
                            {getFieldDecorator('phone', {
                              initialValue: formNext && formNext.phone,
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
                          </Col>
                          <Col span={8}>
                          </Col>
                        </Row>
                      </FormItem>
                      <FormItem
                        {...formItemLayout2}
                        label="验证码"
                        className='captcha'
                      >
                        <Row gutter={8}>
                          <Col span={15}>
                            {getFieldDecorator('captcha', {
                              initialValue: formNext && formNext.captcha,
                              rules: [
                                {
                                  required: true, message: '验证码4位数'
                                },
                                {
                                  validator: this.captchalen
                                }
                              ],
                            })(
                              <Input />
                            )}
                          </Col>
                          <Col span={8}>
                            {
                              second !== 60 ? <Button className="captchaButton" disabled>{second}s之后重新获取</Button> : (
                                verificationShow ? <Button onClick={this.getCaptcha} type="primary">获取验证码</Button> :
                                  <Button disabled className="captchaButton" type="primary">获取验证码</Button>
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
                              initialValue: formNext && formNext.password,
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
                            {
                              passwordShow && <span className='nickname'>(密码为6-16个字符，由大小写字母或数字组成)</span>
                            }
                          </Col>
                        </Row>
                      </FormItem>
                      <FormItem
                        {...formItemLayout2}
                        label="确认密码"
                      >
                        <Row gutter={8}>
                          <Col span={15}>
                            {getFieldDecorator('confirm', {
                              initialValue: formNext && formNext.confirm,
                              rules: [{
                                required: true, message: '请确认你的密码!',
                              }, {
                                validator: this.compareToFirstPassword,
                              }],
                            })(
                              <Input type="password" onBlur={this.handleConfirmBlur} />
                            )}
                          </Col>
                          <Col span={8}>
                          </Col>
                        </Row>
                      </FormItem>
                      <FormItem {...tailFormItemLayout}>
                        <Button className="submitNext" type="primary" htmlType="submit">下一步</Button>
                      </FormItem>
                    </Form>
                  ) : tabIndex === 1 ? (
                    <RegisterNext
                      formNext={this.state.formNext}
                      formValue={this.state.formValue}
                      img={this.state.img}
                      gotoStep={(e, num, values) => this.gotoStep(e, num, values)}
                    />
                  ) : (
                        null
                      )
                }
              </div>
            )
        }
        <Modal
          title="服务协议及隐私权政策"
          width="50%"
          visible={this.state.isAgreement}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          cancelText="不同意"
          okText="同意并确认"
          maskClosable={false}
          mask={true}
          closable={false}
          keyboard={false}
          wrapClassName="wrap-agreement"
        >
          <div className="agreement">
            <p>尊敬的用户，欢迎您访问女神派商家后台管理系统。在您注册成为本网站用户之前，请您务必认真阅读与理解《网站用户注册协议》中所有的条款。您须完全同意协议中所有的条款后，才可以注册成为本网站的用户。您在本网站的注册和操作均将被视为您自愿接受协议内的所有条款及内容。</p>
            <p><b>第一条 声明 </b></p>
            <p>（一）本网站及相关产品的所有权归上海千颂网络科技有限公司所有，协议内简称为“女神派”。本网站为”女神派商家后台管理系统”，协议内简称为“网站”，只对相关业务合作商家开放，请勿随意注册或传播。</p>
            <p>（二）此协议并非商家合作协议，开展合作需要签订《女神派商家合作协议》，若未签订，在注册且审核通过后女神派会在3个工作日内安排相关对接人员联系您签订合同。 　</p>
            <p>（三）协议条款的有效范围为千颂网络科技有限公司旗下所有网站，您的所有相关行为均受该协议的约束。 　　</p>
            <p>（四）任何您使用本网站服务的行为，视为您已知悉本网站的相关公告并同意。 　　</p>
            <p>（五）女神派有权在未提前通知您的情况下修改、暂停本网站的部分或全部服务。</p>

           <p><b>第二条 用户管理 </b></p>
           <p>（一）您对自己在本网站中的行为和操作承担全部责任。</p>
           <p>（二）您需承担责任的形式包括但不仅限于：对受到侵害者进行赔偿、在女神派承担了因您的行为导致的行政处罚或侵权损害赔偿责任后，您应给予女神派等额或更高的赔偿。</p>
           <p>（三）如果女神派发现您有违反中国的相关法律法规的行为，女神派有权在不通知您的情况下采取包括但不仅限于向国家有关机关报告、保存有关记录、关闭您的账号操作权限、停止向您提供服务等措施。</p>
              
           <p><b>第三条 注册用户的权利和义务</b></p>
             <p>（一） 注册用户有权使用本网站的相关服务功能。</p>
             <p>（二） 注册会员同意遵守包括但不仅限于《中华人民共和国保守国家秘密法》、《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《互联网电子公告服务管理规定》、《互联网信息服务管理办法》等在内的法律、法规。</p>
             <p>（三）您注册时有义务提供完整、真实的个人与公司信息，合作期内信息如有变更，应及时更新。</p>
             <p>（四）您成为注册用户后须妥善保管用户名和密码，用户登录后进行的一切活动均视为是账户所有方本人的行为和意愿，您负全部责任。</p>
             <p>（五）您在使用女神派提供的服务时，同意且接受女神派提供的各类信息服务。</p>
            <p>（六）您同意女神派对您提供的相关资质文件及各类信息资料进行审核。女神派的审核为形式审核，审核通过并不代表女神派对审核内容的真实性、合法性、准确性、及时性的确认，用户仍须对其提交的相关资料的真实性、合法性、准确性、及时性等承担相应的法律责任。</p>
          <p><b>第四条 用户隐私</b></p>
            
           <p>女神派承诺，对您公司与个人信息和隐私的安全承担保密义务。未经您授权或同意，女神派不会将您的个人资料信息泄露给第三方，但以下情况除外，且女神派不承担任何责任：</p>
            <p>（一）政府单位按照中华人民共和国的法律、行政法规、部门规章、司法解释等规范性法律文件，要求本网站提供的。 　（二）由于您将用户和密码告知或泄露给他人，由此导致的个人资料泄露。</p>
            <p>（三）包括但不仅限于黑客攻击、计算机病毒侵入或发作、政府管制等不可抗力而造成的用户资料泄露、丢失、被盗用或被篡改等。 　　（四）此外，您若发现有任何非法使用您的用户账号或安全漏洞的情况，应立即通告女神派。</p>
            <p>（五）您在本网站的关记录有可能成为您违反法律法规和本协议的证据。</p>
          <p><b>第五条 知识产权 </b></p>             
             <p>本网站所有的域名、商号、商标、文字、视像及声音内容、图形及图像均受有关所有权和知识产权法律的保护，未经女神派事先书面明确允许，任何个人或单位，均不得进行复制和使用。</p>
            <p><b>第六条 法律适用</b></p>
            <p>（一）协议由上海千颂网络科技有限公司负责修订，并通过本网站公布，您的注册行为即被视为您自愿接受协议的全部条款，受其约束。</p>
            <p>（二）协议的生效、履行、解释及争议的解决均适用中华人民共和国法律。</p>
          </div>
        </Modal>
      </section>
    )
  }
}

export default Form.create()(Register)