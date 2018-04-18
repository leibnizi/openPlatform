import * as React from "react";

import { Layout, Row, Col, Button } from 'antd';
import './index.less'
// const { Content, Sider } = Layout;

export default class Infos extends React.Component<any, {}> {
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
        <Col span={2} className="cotent-title">{item.name}：</Col>
        <Col offset={1} span={21}>{item.value}</Col>
      </Row>
    ))

  }

  render() {
    console.log(this)

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
            <Button onClick={}>修改商家信息</Button>
          </Row>
        </article>
      </Layout>
    )
  }
}
