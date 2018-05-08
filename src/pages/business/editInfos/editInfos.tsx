import * as React from "react";
import { connect } from 'react-redux'
import { Layout, Row, Col, Form, Input, Button, Checkbox, Select } from 'antd';
// import './editInfos.less'
import { business as businessAction } from '../../../redux/actions/index'
import { validateMail } from '../../../utils'

const { getBusinessInfos, editBusinessInfos } = businessAction
const Option = Select.Option;

const FormItem = Form.Item;
const { TextArea } = Input;

class EditInfos extends React.Component<any, {}> {
  constructor(props: any) {
    super(props)
  }
  renderContentItems = () => {
    const content = [
      { name: '运营人员', value: 'ssss' },
      { name: '联系电话', value: 'ssss' },
      { name: '邮箱', value: 'ssss' },
      { name: 'QQ', value: 'ssss' },
      { name: '传真', value: 'ssss' },
      { name: '收货地址', value: 'ssss' },
    ]

    return content.map((item, index) => (
      <Row className="row-box" key={index}>
        <Col span={2} className="cotent-title">{item.name}：</Col>
        <Col offset={1} span={21}>{item.value}</Col>
      </Row>
    ))

  }
  componentDidMount() {
    const { dispatch, businessInfos } = this.props
    // 如果刷新页面或者不是从前面页面跳转过来的，将不会有businessInfos，所以要手动获取
    if (JSON.stringify(businessInfos) === "{}"){
      dispatch(getBusinessInfos())
    }
  }

  editMsg = () => {
    // console.log("sss")
    this.props.history.push('edit_infos')
  }

  // validateMail = (rule, value, callback) => {
  //   const form = this.props.form;
  //   if (value && !value.match(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)) {
  //     callback('邮箱格式有误！');
  //   } else {
  //     callback()
  //   }
  // }

  handleSubmit = (e:any) => {
    const { dispatch } = this.props
    
    e.preventDefault();
    this.props.form.validateFields((err:any, value:any) => {
      if (!err) {
        dispatch(editBusinessInfos(value))
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    
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
    const formItemLayout2 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const formItemLayoutTooLong = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    };
    
    const {
      businessInfos: {
        biz_name, profit_level, brand, website, biz_intro, merchant_state,
        biz_operator, mobile, email, qq, faxes, address, biz_type, category_id,
        cooperation_term, categoryAll//对象
      }
    } = this.props
    let categoryAllArr:any = []
    if (categoryAll) {
      categoryAllArr = Object.keys(categoryAll).map((item:any, index:number)=> {
        return categoryAll[`${item}`]
      })
    }
    return (
      <Layout className="bs-info-box">
        <header>
          <Row className="row-box">
            <Col className="bsInfos-content-title">商家信息：</Col>
          </Row>
        </header>

        <article>
          <Form 
            onSubmit={this.handleSubmit} 
            layout="vertical"
            className="edit-form">
            <Row className="">
              <Col span={3} className="cotent-title bsInfos-label">企业名称：</Col>
              <Col className="cotent-title-text" span={3}>{biz_name}</Col>
              <Col className="describe profit-level" span={13}>
                <FormItem
                  {...formItemLayoutTooLong}
                  label="上季度盈利量级"
                >
                  {getFieldDecorator('profit_level', {
                    initialValue: profit_level,
                    rules: [{ required: true, message: '请选择上季度盈利量级' }],
                  })(
                    <Select style={{ width: 120 }}>
                      <Option value={1}>万元以下</Option>
                      <Option value={2}>万元</Option>
                      <Option value={3}>10万元</Option>
                      <Option value={4}>百万元</Option>
                      <Option value={5}>千万</Option>
                      <Option value={6}>亿元以上</Option>
                      {/* <Option value="disabled" disabled>Disabled</Option>
                      <Option value="Yiminghe">yiminghe</Option> */}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row className="form-row">
              <Col>
                <FormItem
                  {...formItemLayout2}
                  label="主营品牌"
                >
                  {getFieldDecorator('brand', {
                    initialValue: `${brand}`,
                    rules: [{ required: false}],
                  })(
                    <Input placeholder="主营品牌" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className="form-row">
              <Col>
                <FormItem
                  {...formItemLayout2}
                  label="供应商简介"
                >
                  {getFieldDecorator('biz_intro', {
                    initialValue: `${biz_intro}`,
                    rules: [{ required: false, message: '' }],
                  })(
                    <TextArea rows={4} placeholder="供应商简介" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className="form-row">
              <Col>
                <FormItem
                  {...formItemLayout2}
                  label="官网地址"
                >
                  {getFieldDecorator('website', {
                    initialValue: `${website}`,
                    rules: [{ required: false, message: '' }],
                  })(
                    <Input placeholder="请输入官网地址" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" align="middle" className="row-box">
              <Col span={3} className="cotent-title bsInfos-label">商家状态：</Col>
              <Col span={2}>{merchant_state}</Col>
              {/* <Col span={2}><Button>续约</Button></Col> */}
              <Col className="describe" span={14}>有效期至：{cooperation_term && cooperation_term.substring(0, 11)}</Col>
            </Row>
            <Row className="form-row">
              <Col>
                <FormItem
                  {...formItemLayout2}
                  label="类目"
                >
                  {getFieldDecorator('category_id', {
                    initialValue: category_id,
                    rules: [{ required: true, message: '请输入主营类目' }],
                  })(
                    <Checkbox.Group style={{ width: '100%', marginTop: '10px' }}>
                      <Row>
                      {categoryAllArr.map((item, index) => 
                        <Col span={3} key={index}>
                          <Checkbox value={index + 1}>{item}</Checkbox>
                        </Col>
                        )}
                      </Row>
                    </Checkbox.Group>
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className="form-row">
              <Col>
                <FormItem
                  {...formItemLayout2}
                  label="运营人员"
                >
                  {getFieldDecorator('biz_operator', {
                    initialValue: biz_operator,
                    rules: [{ required: true, message: '请输入运营人员!' }],
                  })(
                    // <Select style={{ width: 120 }}>
                    //   <Option value={1}>品牌方</Option>
                    //   <Option value={2}>经销商</Option>
                    //   {/* <Option value="disabled" disabled>Disabled</Option>
                    //   <Option value="Yiminghe">yiminghe</Option> */}
                    // </Select>
                      <Input />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className="line" />
            <Row className="form-row">
              <Col>
                <FormItem
                  {...formItemLayout2}
                  label="商家类型"
                >
                  {getFieldDecorator('biz_type', {
                    initialValue: biz_type,
                    rules: [{ required: true, message: '请选择商家类型' }],
                  })(
                    <Select style={{ width: 120 }}>
                      <Option value={1}>品牌方</Option>
                      <Option value={2}>经销商</Option>
                      <Option value={3}>大牌工厂</Option>
                      <Option value={4}>独立设计师</Option>
                      <Option value={5}>其他类型</Option>
                    </Select>
                    )}
                </FormItem>
              </Col>
            </Row>
            
            <Row className="form-row">
              <Col>
                <FormItem
                  {...formItemLayout2}
                  label="联系电话"
                >
                  {getFieldDecorator('biz_mobile', {
                    initialValue: `${mobile}`,
                    rules: [{ required: true, message: '请输入联系电话！' }],
                  })(
                    <Input placeholder="请输入联系电话" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className="form-row">
              <Col>
                <FormItem
                  {...formItemLayout2}
                  label="邮箱"
                >
                  {getFieldDecorator('biz_email', {
                    initialValue: `${email}`,
                    rules: [
                      { required: false, message: '' },
                      { 
                        validator: validateMail,
                        message: '邮箱格式有误！'
                      }
                    ],
                  })(
                    <Input placeholder="请输入邮箱" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className="form-row">
              <Col>
                <FormItem
                  {...formItemLayout2}
                  label="QQ"
                >
                  {getFieldDecorator('qq', {
                    initialValue: `${qq}`,
                    rules: [{ required: false, message: '请输入QQ！' }],
                  })(
                    <Input placeholder="请输入QQ" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className="form-row">
              <Col>
                <FormItem
                  {...formItemLayout2}
                  label="传真"
                >
                  {getFieldDecorator('faxes', {
                    initialValue: `${faxes}`,
                    rules: [{ required: false, message: '' }],
                  })(
                    <Input placeholder="请输入传真" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className="form-row">
              <Col>
                <FormItem
                  {...formItemLayout2}
                  label="收货地址"
                >
                  {getFieldDecorator('biz_address', {
                    initialValue: `${address}`,
                    rules: [{ required: true, message: '请输入收获地址' }],
                  })(
                    <Input placeholder="请输入收货地址" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={3} className="edit-infos-btn text-right">
                <Button type="primary" htmlType="submit">确认修改</Button>
              </Col>
            </Row>
          </Form>
        </article>
      </Layout>
    )
  }
}

const mapStateToProps: any = ({ businessInfos, userInfo }: any) => ({
  businessInfos,
  userInfo
})

const mapDispatchToProps: any = (dispatch: any) => ({
  dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(EditInfos))