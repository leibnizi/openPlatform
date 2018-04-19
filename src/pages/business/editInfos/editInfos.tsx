import * as React from "react";
import { connect } from 'react-redux'
import { fetchUtil } from '../../../services/httpRequest'
import { Layout, Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd';
import './editInfos.less'

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
    const { token } = this.props.state.userInfo;
    fetchUtil('api/merchant/index', token).then((res: any) => {
      console.log(res, "ttt")
      // const { status_code, msg, data } = res
      // if (status_code == 0 ) {

      // }
    })
  }

  editMsg = () => {
    // console.log("sss")
    this.props.history.push('edit_infos')
  }
  handleSubmit = () => {
    console.log(222)
  }
  affirm = () => {
    console.log("affirm")
    this.props.history.push('bsInfo')
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
        sm: { span: 14 },
      },
    };

    return (
      <Layout className="bs-info-box">
        <header>
          <Row className="row-box">
            <Col span={2} className="cotent-title">商家信息：</Col>
            <Col className="describe" offset={1} span={21} >BUSINESS INFOMATION</Col>
          </Row>
        </header>

        <article>
          <Form onSubmit={this.handleSubmit} className="edit-form">
            <Row className="">
              <Col span={3} className="cotent-title">企业名称：</Col>
              <Col className="cotent-title-text" offset={1} span={3}>上海千颂</Col>
              <Col className="describe" span={10}>
                <FormItem
                  {...formItemLayout}
                  label="上季度盈利量级"
                >
                  {getFieldDecorator('grade', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
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
                    rules: [{ required: true, message: 'Please input your username!' }],
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
                  {getFieldDecorator('supplier', {
                    rules: [{ required: true, message: 'Please input your username!' }],
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
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input placeholder="请输入官网地址" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" align="middle" className="row-box">
              <Col span={3} className="cotent-title">商家状态：</Col>
              <Col span={1}>正常</Col>
              <Col span={2}><Button>续约</Button></Col>
              <Col className="describe" span={14}>有效期至：2019年1月28日</Col>
            </Row>
            <Row className="form-row">
              <Col>
                <FormItem
                  {...formItemLayout2}
                  label="类目"
                >
                  {getFieldDecorator('type', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Checkbox.Group style={{ width: '100%', marginTop: '10px' }}>
                      <Row>
                        <Col span={3}><Checkbox value="A">女装</Checkbox></Col>
                        <Col span={3}><Checkbox value="B">箱包</Checkbox></Col>
                        <Col span={3}><Checkbox value="C">配饰</Checkbox></Col>
                        <Col span={3}><Checkbox value="D">其他</Checkbox></Col>
                      </Row>
                    </Checkbox.Group>,
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
                  {getFieldDecorator('bs_type', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input placeholder="请输入运营人员" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className="line" />
            <Row className="form-row">
              <Col>
                <FormItem
                  {...formItemLayout2}
                  label="联系电话"
                >
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: 'Please input your username!' }],
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
                  {getFieldDecorator('e_mail', {
                    rules: [{ required: true, message: 'Please input your username!' }],
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
                    rules: [{ required: true, message: 'Please input your username!' }],
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
                  {getFieldDecorator('fax', {
                    rules: [{ required: true, message: 'Please input your username!' }],
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
                  label="收获地址"
                >
                  {getFieldDecorator('address', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input placeholder="请输入收货地址" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className="btn-box">
              <Col span={3} className="text-right">
                <Button onClick={() => this.affirm()}>确认修改</Button>
              </Col>
            </Row>
          </Form>
        </article>
      </Layout>
    )
  }
}

const mapStateToProps: any = (state: object) => ({
  state: state
})

const mapDispatchToProps: any = (dispatch: any) => ({
  dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(EditInfos))