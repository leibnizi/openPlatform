import * as React from "react";
import { connect } from 'react-redux'
// import { fetchUtil } from '../../services/httpRequest'
import { Layout, Row, Col, Button } from 'antd';

import './index.less'
import '../../styles/common.less'
// const { Content, Sider } = Layout;
class Infos extends React.Component<any, {}> {
  constructor(props:any) {
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
        <Col span={3} className="content-title-label">{item.name}：</Col>
        <Col className="content-title-text" span={20}>{item.value}</Col>
      </Row>
    ))

  }
  componentDidMount() {
    fetch('/api/financial/financial_view').then(res => res.json())
    
      // .then(res => this.setState({ overviewdata: res }))
      
    // const { token } = this.props.state.userInfo;
    // const token = '19$$b5fbab2e48ad5a0470ef8a351f9b6aa9'
    // fetchUtil('/api/merchant/index', token).then((res:any) => {
    //   console.log(res,"ttt")
    //   // const { status_code, msg, data } = res
    //   // if (status_code == 0 ) {
        
    //   // }
    // })
    // fetch(`/api/merchant/index?token=${token}`).then(function(response:any) {
    //   return response.json();
    // })
  }

  editMsg = () => {
    // console.log("sss")
    this.props.history.push('edit_infos')
  }

  render() {
    console.log(this)

    return (
      <Layout className="bs-info-box">
        <header>
          <Row className="">
            <Col span={3} className="content-title">商家信息</Col>
            <Col className="describe" offset={1} span={20} >BUSINESS INFOMATION</Col>
          </Row>
        </header>

        <article>
          <Row className="row-box">
            <Col span={3} className="content-title-label">企业名称：</Col>
            <Col className="content-title-text" span={3}>上海千颂</Col>
            <Col className="describe" span={5}>上季度盈利量级：千万元</Col>
          </Row>
          <Row className="row-box">
            <Col span={3} className="content-title-label">主营品牌：</Col>
            <Col className="content-title-text" span={20} >CK</Col>
          </Row>
          <Row className="row-box">
            <Col span={3} className="content-title-label">供应商简介：</Col>
            <Col className="content-title-text" span={20}>很多字</Col>
          </Row>
          <Row className="row-box">
            <Col span={3} className="content-title-label">官网地址：</Col>
            <Col className="content-title-text" span={20}>很多字</Col>
          </Row>
          <Row type="flex" align="middle" className="row-box">
            <Col span={3} className="content-title-label">商家状态：</Col>
            <Col className="content-title-text" span={1}>正常</Col>
            <Col offset={1} span={2}><Button>续约</Button></Col>
            <Col className="describe" span={15}>有效期至：2019年1月28日</Col>
          </Row>
          <Row className="row-box">
            <Col span={3} className="content-title-label">类目：</Col>
            <Col className="content-title-text" span={20}>女装</Col>
          </Row>
          <Row className="row-box">
            <Col span={3} className="content-title-label">商家类型：</Col>
            <Col className="content-title-text" span={20}>品牌方</Col>
          </Row>
          <Row className="line" />
          {this.renderContentItems()}
          <Row className="edit-msg">
            <Button onClick={() => this.editMsg()}>修改商家信息</Button>
          </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(Infos)