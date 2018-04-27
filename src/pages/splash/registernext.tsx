import * as React from 'react'
import { Upload, Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import request from '../../services/httpRequest'
import './register.less'

class RegisterNext extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      fileListSupplement: [],
      fileListSupplement2: [],
      autoCompleteResult: []
    }
  }

  gotoStep = (e: any, tabIndex: number) => {
    e.preventDefault()
    this.setState({ tabIndex })
  }

  handleChange = (fileList: any) => this.setState({ fileList: fileList.fileList })

  handleChangeList = (fileList: any) => this.setState({ fileListSupplement: fileList.fileList })

  handleChangeList2 = (fileList: any) => this.setState({ fileListSupplement2: fileList.fileList })

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file: any) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleSubmit = (e: any) => {
    console.log('handleSubmit')
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('err', err)
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }


  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
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
      mobile, email, qq, faxes, biz_address, previewVisible, previewImage, fileListSupplement,
      fileListSupplement2
    } = this.state
    const FormItem = Form.Item;
    const Option = Select.Option;
    const AutoCompleteOption = AutoComplete.Option;
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
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
          offset: 18,
        },
        sm: {
          span: 16,
          offset: 6,
        },
      },
    }
    const upLoadButton = <div>
      <span className='upload'>上传</span>
      <p className='uploadfont'>限制XXX像素</p>
    </div>

    return (

      <Form onSubmit={(e) => this.handleSubmit(e)}>
        <FormItem
          {...formItemLayout}
          label="企业名称"
        >
          {getFieldDecorator('biz_name', {
            rules: [{
              required: true, message: 'Please input your nickname!', whitespace: true, extra: '输入非法字符'
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="上年度营业额量级"
        >
          {getFieldDecorator('profit_level', {
            rules: [{
              message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Select
              style={{ width: '100%' }}
              onChange={(e: any) => {
                this.props.form.setFieldsValue({ profit_level: e })
              }}
            >
              <Option value="万元以下">万元以下</Option>
              <Option value="万元">万元</Option>
              <Option value="十万">十万</Option>
              <Option value="百万">百万</Option>
              <Option value="千万">千万</Option>
              <Option value="亿元">亿元</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="主营品牌"
        >
          {getFieldDecorator('brand', {
            rules: [{ required: false, message: 'Please input your phone number!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="官网地址"
        >
          {getFieldDecorator('website', {
            rules: [{ required: false, message: 'Please input your phone number!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="主营类目"
        >
          {getFieldDecorator('category_id', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Checkbox.Group
              style={{ width: '100%' }}
              onChange={(value: any) => this.props.form.setFieldsValue({ category_id: value })}
            >
              <Col span={8}><Checkbox value="1">日常服</Checkbox></Col>
              <Col span={8}><Checkbox value="2">礼服</Checkbox></Col>
              <Col span={8}><Checkbox value="3">环保袋</Checkbox></Col>
              <Col span={8}><Checkbox value="4">服装</Checkbox></Col>
              <Col span={8}><Checkbox value="5">童装</Checkbox></Col>
            </Checkbox.Group>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="商家类型"
        >
          {getFieldDecorator('biz_type', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Select
              style={{ width: '100%' }}
              onChange={(value: any) => {
                this.props.form.setFieldsValue({ biz_type: value })
              }}
            >
              <Option value="1">品牌方</Option>
              <Option value="2">经销商</Option>
              <Option value="3">大牌工厂</Option>
              <Option value="4">独立设计师</Option>
              <Option value="5">其他类型</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="运营人员"
        >
          {getFieldDecorator('biz_operator', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系电话"
        >
          {getFieldDecorator('biz_mobile', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱"
        >
          {getFieldDecorator('email', {
            rules: [{ required: false, message: 'Please input your phone number!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="QQ"
        >
          {getFieldDecorator('qq', {
            rules: [{ required: false, message: 'Please input your phone number!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="传真"
        >
          {getFieldDecorator('faxes', {
            rules: [{ required: false, message: 'Please input your phone number!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="公司地址"
        >
          {getFieldDecorator('biz_address', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <hr />
        <FormItem
          {...formItemLayout2}
          label="营业执照"
        >
          {getFieldDecorator('files', {
            rules: [{ required: false, message: 'Please input your phone number!' }],
          })(
            <div>
              <Upload
                action="http://api.v2.msparis.com/common/upload"
                listType="picture-card"
                fileList={fileListSupplement}
                onPreview={this.handlePreview}
                onChange={this.handleChangeList}
                multiple={true}
                className='uploadImg'
              >
                {fileListSupplement.length >= 1 ? null : upLoadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout2}
          label="补充资质"
        >
          {getFieldDecorator('files', {
            rules: [{ required: false, message: 'Please input your phone number!' }],
          })(
            <div>
              <Upload
                action="http://api.v2.msparis.com/common/upload"
                listType="picture-card"
                fileList={fileListSupplement2}
                onPreview={this.handlePreview}
                onChange={this.handleChangeList2}
                multiple={true}
                className='uploadImg'
              >
                {fileListSupplement2.length >= 10 ? null : upLoadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button className='submitButton' type="primary" onClick={e => this.props.gotoStep(e, 0)}>上一步</Button>
          <Button className='submitButton' type="primary" htmlType="submit">下一步</Button>
        </FormItem>
      </Form>
    )
  }
};

export default Form.create()(RegisterNext)
