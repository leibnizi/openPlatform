import * as React from 'react'
import { Upload, Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message } from 'antd'
import { connect } from 'react-redux'
import request from '../../services/httpRequest'
import './register.less'
import index from '../../routes'

class RegisterNext extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      fileListSupplement: [],
      fileListSupplement2: [],
      autoCompleteResult: [],
      imgUrl: null,
      checkUpload: false
    }
  }

  handleChange = (fileList: any) => this.setState({ fileList: fileList.fileList })

  handleChangeList = (fileList: any) => {
    let imgUrl: string[] = []
    if (fileList.file.response) {
      fileList.file.response.data.map((item: any, index: number) => {
        imgUrl.push(item.url)
      })
    }
    this.setState({
      fileListSupplement: fileList.fileList,
      imgUrl,
      checkUpload: false
    })
  }

  handleChangeList2 = (fileList: any) => {
    let imgUrl2: string[] = this.state.imgUrl2 ? this.state.imgUrl2 : []
    if (fileList.file.response) {
      fileList.file.response.data.map((item: any, index: number) => {
        imgUrl2.push(item.url)
      })
    }
    this.setState({
      fileListSupplement2: fileList.fileList,
      imgUrl2
    })
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file: any) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  photoCheck = (rule, value, callback) => {
    console.log('value', value)
    if (!value) {
      callback('请输入营业执照')
    } else {
      callback()
    }
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
    const {
      email, faxes, phone, nickname, password, confirm,
      captcha
    } = this.props.formNext
    const { imgUrl, imgUrl2 } = this.state
    let files: any = []
    imgUrl && imgUrl.map((item: any, index: number) => files.push({
      file: item,
      type_id: 1
    }))
    imgUrl2 && imgUrl2.map((item: any, index: number) => files.push({
      file: item,
      type_id: 2
    }))
    if (!imgUrl) {
      this.setState({ checkUpload: true })
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        request.post('/api/register', {
          biz_address: values.biz_address,
          biz_email: values.email,
          biz_mobile: values.biz_mobile,
          biz_name: values.biz_name,
          biz_operator: values.biz_operator,
          biz_type: values.biz_type,
          brand: values.brand,
          category_id: values.category_id,
          email,
          faxes: values.faxes,
          files,
          mobile: phone,
          name: nickname,
          password,
          password_confirmation: confirm,
          profit_level: values.profit_level,
          qq: values.qq,
          verification_code: captcha,
          website: values.website
        })
          .then((res: any) => {
            if (res.status_code === 0) {
              this.props.gotoStep(e, 2)
            } else {
              message.error(res.msg)
            }
          })
      }
    });
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
      fileListSupplement2, autoCompleteResult, checkUpload
    } = this.state
    const { formValue } = this.props
    const FormItem = Form.Item;
    const Option = Select.Option;
    const AutoCompleteOption = AutoComplete.Option;
    const { getFieldDecorator } = this.props.form;
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

      <Form onSubmit={(e) => this.handleSubmit(e)} className='registerForm'>
        <FormItem
          {...formItemLayout}
          label="企业名称"
        >
          {getFieldDecorator('biz_name', {
            initialValue: formValue && formValue.biz_name,
            rules: [{
              required: true, message: '请输入企业名称!', whitespace: true, extra: '输入非法字符'
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
            initialValue: formValue && formValue.profit_level,
            rules: [{
              message: 'The input is not valid E-mail!',
            }, {
              required: true, message: '请选择上年度营业额量级',
            }],
          })(
            <Select
              style={{ width: '100%' }}
              onChange={(e: any) => {
                this.props.form.setFieldsValue({ profit_level: e })
              }}
            >
              <Option value="1">万元以下</Option>
              <Option value="2">万元</Option>
              <Option value="3">十万</Option>
              <Option value="4">百万</Option>
              <Option value="5">千万</Option>
              <Option value="6">亿元</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="主营品牌"
        >
          {getFieldDecorator('brand', {
            initialValue: formValue && formValue.brand,
            rules: [{ required: false, message: '请输入主营品牌!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="官网地址"
        >
          {getFieldDecorator('website', {
            initialValue: formValue && formValue.website,
            rules: [{ required: false, message: '请输入官网地址!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="主营类目"
        >
          {getFieldDecorator('category_id', {
            initialValue: formValue && formValue.category_id,
            rules: [{ required: true, message: '请输入主营类目!' }],
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
            initialValue: formValue && formValue.biz_type,
            rules: [{ required: true, message: '请输入商家类型!' }],
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
            initialValue: formValue && formValue.biz_operator,
            rules: [{ required: true, message: '请输入运营人员!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系电话"
        >
          {getFieldDecorator('biz_mobile', {
            initialValue: formValue && formValue.biz_mobile,
            rules: [{ required: true, message: '请输入联系电话!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱"
        >
          {getFieldDecorator('email', {
            initialValue: formValue && formValue.email,
            rules: [{ required: false, message: '请输入邮箱!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="QQ"
        >
          {getFieldDecorator('qq', {
            initialValue: formValue && formValue.qq,
            rules: [{ required: false, message: '请输入qq!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="传真"
        >
          {getFieldDecorator('faxes', {
            initialValue: formValue && formValue.faxes,
            rules: [{ required: false, message: '请输入传真!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="公司地址"
        >
          {getFieldDecorator('biz_address', {
            initialValue: formValue && formValue.biz_address,
            rules: [{ required: true, message: '请输入公司地址!' }],
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
            rules: [
              {
                required: true, message: '请输入营业执照!'
              },
              {
                validator: this.photoCheck,
              }],
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
          {
            checkUpload && <span className="checkUpload">请先上传图片</span>
          }
        </FormItem>
        <FormItem
          {...formItemLayout2}
          label="补充资质"
        >
          {getFieldDecorator('files', {
            rules: [{ required: false, message: '请输入补充资质!' }],
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
          <Button
            className='submitButton'
            type="primary"
            onClick={e => {
              this.props.form.validateFieldsAndScroll((err, values) => {
                this.props.gotoStep(e, 0, values)
              })
            }}
          >
            上一步
          </Button>
          <Button className='submitButton' type="primary" htmlType="submit">下一步</Button>
        </FormItem>
      </Form>
    )
  }
}

const mapStateToProps: any = (state: object) => ({
  state: state
})

const mapDispatchToProps: any = (dispatch: any) => ({
  dispatch
})

const RegisterPage = Form.create()(RegisterNext)
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
