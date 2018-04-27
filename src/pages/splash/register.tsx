import * as React from 'react'
import { Upload, Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import './register.less'

// import { fetchUtil } from '../../services/httpRequest'

export default class Register extends React.Component<any, any> {
  constructor(props: any) {
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

  // componentDidMount() {
  //   fetchUtil('api/login', { name: '12', mobile: '1221' }).then(v => console.log('login', v))
  // }

  gotoStep = (e: any, tabIndex: number) => {
    e.preventDefault()
    this.setState({ tabIndex })
  }

  handleChange = (fileList: any) => this.setState({ fileList: fileList.fileList })

  handleChangeList = (fileList: any) => this.setState({ fileListSupplement: fileList.fileList })

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file: any) => {
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
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const {
      tabIndex, name, mail, phone, verificationCode, password, confirmPassword,
      biz_name, profit_level, brand, website, category_id, biz_type, biz_operator,
      mobile, email, qq, faxes, biz_address, previewVisible, previewImage, fileList, fileListSupplement
    } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const FormItem = Form.Item;
    const Option = Select.Option;
    const AutoCompleteOption = AutoComplete.Option;
    const residences = [{
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
          value: 'xihu',
          label: 'West Lake',
        }],
      }],
    }, {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
          value: 'zhonghuamen',
          label: 'Zhong Hua Men',
        }],
      }],
    }];
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const formItemLayout = {
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
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

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
                {/* <header>
                  <span
                    className={tabIndex===0?'registerActive headerfont':'registernormal headerfont'}
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
                  className={tabIndex===1?'registerActive':'registernormal'}
                >
                  {
                    tabIndex === 1 ? (
                      <img src={require('../../styles/img/number2.png')} />
                    )  : (
                      <img src={require('../../styles/img/unnumber2.png')} />
                    )
                  }
                  填写商家信息
                </span>
              </header>
              <hr/>
              {
                tabIndex === 0 ? (
                  <form onSubmit={(e) => this.gotoStep(e, 1)}>
                    <label
                      className='name'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          用户名:
                        </span>
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => this.setState({name:e.target.value})}
                        placeholder='（用户名为6-16个字符，不可使用非法字符串）'
                      />
                    </label>
                    <label
                      className='mail'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          邮箱:
                        </span>
                      </div>
                      <input type="text" value={mail} onChange={(e) => this.setState({mail: e.target.value})} />
                    </label>
                    <label
                      className='phone'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          手机号:
                        </span>
                      </div>
                      <input type="text" value={phone} onChange={(e) => this.setState({phone: e.target.value})} />
                    </label>
                    <label
                      className='verificationCode'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          验证码:
                        </span>
                      </div>
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => this.setState({verificationCode: e.target.value})}
                      />
                      <span className='vCode'>获取验证码</span>
                    </label>
                    <label
                      className='password'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          密码:
                        </span>
                      </div>
                      <input
                        type="text"
                        value={password}
                        onChange={(e) => this.setState({password: e.target.value})}
                        placeholder='(密码为6-16个字符，由大小写字母或数字组成)'
                      />
                    </label>
                    <label
                      className='confirmPassword'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          确认密码:
                        </span>
                      </div>
                      <input
                        type="text"
                        value={confirmPassword}
                        onChange={(e) => this.setState({confirmPassword:e.target.value})}
                      />
                    </label>
                    <input className='submit' type="submit" value="下一步" />
                  </form>
                ) : tabIndex === 1 ? (
                  <form onSubmit={(e) => this.gotoStep(e, 2)}>
                    <label
                      className='biz_name'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          企业名称：
                        </span>
                      </div>
                      <input type="text" value={biz_name} onChange={(e) => this.setState({biz_name: e.target.value})} />
                    </label>
                    <label
                      className='profit_level'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          上年度营业额量级：
                        </span>
                      </div>
                      <input
                        type="text"
                        value={profit_level}
                        onChange={(e) => this.setState({profit_level: e.target.value})}
                      />
                    </label>
                    <label
                      className='brand'
                    >
                      <div className='symbol'>
                        <span className='labelName'>
                          主营品牌：
                        </span>
                      </div>
                      <input type="text" value={brand} onChange={(e) => this.setState({brand: e.target.value})} />
                    </label>
                    <label
                      className='website'
                    >
                      <div className='symbol'>
                        <span className='labelName'>
                          官网地址：
                        </span>
                      </div>
                      <input
                        type="text"
                        value={website}
                        onChange={(e) => this.setState({website:e.target.value})}
                      />
                    </label>
                    <label
                      className='category_id'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          主营类目：
                        </span>
                      </div>
                      <input 
                        type="text" 
                        value={category_id} 
                        onChange={(e) => this.setState({category_id: e.target.value})} 
                      />
                    </label>
                    <label
                      className='biz_type'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          商家类型：
                        </span>
                      </div>
                      <input
                        type="text"
                        value={biz_type}
                        onChange={(e) => this.setState({biz_type: e.target.value})}
                      />
                    </label>
                    <label
                      className='biz_operator'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          运营人员：
                        </span>
                      </div>
                      <input 
                        type="text" 
                        value={biz_operator} 
                        onChange={(e) => this.setState({biz_operator: e.target.value})} 
                      />
                    </label>
                    <label
                      className='mobile'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          联系电话：
                        </span>
                      </div>
                      <input type="text" value={mobile} onChange={(e) => this.setState({mobile: e.target.value})} />
                    </label>
                    <label
                      className='email'
                    >
                      <div className='symbol'>
                        <span className='labelName'>
                          邮箱：
                        </span>
                      </div>
                      <input type="text" value={email} onChange={(e) => this.setState({email: e.target.value})} />
                    </label>
                    <label
                      className='qq'
                    >
                      <div className='symbol'>
                        <span className='labelName'>
                          QQ：
                        </span>
                      </div>
                      <input type="text" value={qq} onChange={(e) => this.setState({qq: e.target.value})} />
                    </label>
                    <label
                      className='faxes'
                    >
                      <div className='symbol'>
                        <span className='labelName'>
                          传真：
                        </span>
                      </div>
                      <input type="text" value={faxes} onChange={(e) => this.setState({faxes: e.target.value})} />
                    </label>
                    <label
                      className='biz_address'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          公司地址：
                        </span>
                      </div>
                      <input 
                        type="text" 
                        value={biz_address} 
                        onChange={(e) => this.setState({biz_address: e.target.value})} 
                      />
                    </label>
                    <hr/>
                    <div
                      className='uploadFile'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          营业执照：
                        </span>
                      </div>
                      <Upload
                        action="http://api.v2.msparis.com/common/upload"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        multiple={true}
                        className='uploadImg'
                      >
                        {fileList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>
                    <div
                      className='uploadFile'
                    >
                      <div className='symbol'>
                        <span className='labelName'>
                          补充资质：
                        </span>
                      </div>
                      <Upload
                        action="http://api.v2.msparis.com/common/upload"
                        listType="picture-card"
                        fileList={fileListSupplement}
                        onPreview={this.handlePreview}
                        onChange={this.handleChangeList}
                        multiple={true}
                        className='uploadImg'
                      >
                        {fileList.length >= 20 ? null : uploadButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>
                    <div className='infoBottom'>
                      <button className='submit' onClick={(e)=>this.gotoStep(e, 0)}>上一步</button>
                      <input className='submit' type="submit" value="下一步" />
                    </div>
                  </form>
                ) : (
                  null
                )
              } */}
                <Form onSubmit={this.handleSubmit}>
                  <FormItem
                    {...formItemLayout}
                    label="E-mail"
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
                    label="Password"
                  >
                    {getFieldDecorator('password', {
                      rules: [{
                        required: true, message: 'Please input your password!',
                      }, {
                        validator: this.validateToNextPassword,
                      }],
                    })(
                      <Input type="password" />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="Confirm Password"
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
                  <FormItem
                    {...formItemLayout}
                    label={(
                      <span>
                        Nickname&nbsp;
                          <Tooltip title="What do you want others to call you?">
                          <Icon type="question-circle-o" />
                        </Tooltip>
                      </span>
                    )}
                  >
                    {getFieldDecorator('nickname', {
                      rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="Habitual Residence"
                  >
                    {getFieldDecorator('residence', {
                      initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                      rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
                    })(
                      <Cascader options={residences} />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="Phone Number"
                  >
                    {getFieldDecorator('phone', {
                      rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                      <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="Website"
                  >
                    {getFieldDecorator('website', {
                      rules: [{ required: true, message: 'Please input website!' }],
                    })(
                      <AutoComplete
                        dataSource={websiteOptions}
                        onChange={this.handleWebsiteChange}
                        placeholder="website"
                      >
                        <Input />
                      </AutoComplete>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="Captcha"
                    extra="We must make sure that your are a human."
                  >
                    <Row gutter={8}>
                      <Col span={12}>
                        {getFieldDecorator('captcha', {
                          rules: [{ required: true, message: 'Please input the captcha you got!' }],
                        })(
                          <Input />
                        )}
                      </Col>
                      <Col span={12}>
                        <Button>Get captcha</Button>
                      </Col>
                    </Row>
                  </FormItem>
                  <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                      valuePropName: 'checked',
                    })(
                      <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                    )}
                  </FormItem>
                  <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                  </FormItem>
                </Form>
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