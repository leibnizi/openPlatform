import * as React from "react";
import { connect } from 'react-redux'
import { fetchUtil } from '../../../services/httpRequest'
import { Layout, Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd';
import './editInfos.less'

const FormItem = Form.Item;

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

    return (
      <Layout className="bs-info-box">
        <header>
          <Row className="row-box">
            <Col span={2} className="cotent-title">商家信息：</Col>
            <Col className="describe" offset={1} span={21} >BUSINESS INFOMATION</Col>
          </Row>
        </header>

        <article>
          <Row className="row-box">
            <Col span={2} className="cotent-title">企业名称：</Col>
            <Col offset={1} span={3}>上海千颂</Col>
            <Col className="describe" span={5}>上季度盈利量级：千万元</Col>
          </Row>
          <Row className="row-box">
            <Col span={2} className="cotent-title">主营品牌：</Col>
            <Col offset={1} span={21} >CK</Col>
          </Row>
          <Row className="row-box">
            <Col span={2} className="cotent-title">供应商简介：</Col>
            <Col offset={1} span={21}>很多字</Col>
          </Row>
          <Row className="row-box">
            <Col span={2} className="cotent-title">官网地址：</Col>
            <Col offset={1} span={21}>很多字</Col>
          </Row>
          <Row type="flex" align="middle" className="row-box">
            <Col span={2} className="cotent-title">商家状态：</Col>
            <Col offset={1} span={1}>正常</Col>
            <Col span={2}><Button>续约</Button></Col>
            <Col className="describe" span={15}>有效期至：2019年1月28日</Col>
          </Row>
          <Row className="row-box">
            <Col span={2} className="cotent-title">类目：</Col>
            <Col offset={1} span={21}>女装</Col>
          </Row>
          <Row className="row-box">
            <Col span={2} className="cotent-title">商家类型：</Col>
            <Col offset={1} span={21}>品牌方</Col>
          </Row>
          <Row className="line" />
          {this.renderContentItems()}
          <Row>
            <Button onClick={() => this.editMsg()}>修改商家信息</Button>
          </Row>

          <Form onSubmit={this.handleSubmit} className="edit-form">
            <Row className="row-box">
              <Col span={2} className="cotent-title">企业名称：</Col>
              <Col className="cotent-title-text" offset={1} span={3}>上海千颂</Col>
              <Col className="describe" span={14}>
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
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input 
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                  type="password" 
                  placeholder="Password" 
                />
                )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
                )}
              <a className="login-form-forgot" href="">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
          </Button>
              Or <a href="">register now!</a>
            </FormItem>
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