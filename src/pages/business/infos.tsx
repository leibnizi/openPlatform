import * as React from "react";
import { connect } from 'react-redux'
import { Layout, Row, Col, Button } from 'antd';

import './index.less';
import '../../styles/common.less';
import { business as businessAction } from '../../redux/actions/index'
const { getBusinessInfos } = businessAction

class Infos extends React.Component<any, {}> {
  constructor(props: any) {
    super(props)
  }
  renderContentItems = () => {
    const { businessInfos: { biz_operator, mobile, email, qq, faxes, address } } = this.props
    const content = [
      { name: '运营人员', value: biz_operator },
      { name: '联系电话', value: mobile },
      { name: '邮箱', value: email },
      { name: 'QQ', value: qq },
      { name: '传真', value: faxes },
      { name: '收货地址', value: address },
    ]

    return content.map((item, index) => (
      <Row type="flex" className="row-box" key={index}>
        <Col span={3} className="content-title-label">{item.name}：</Col>
        <Col className="content-title-text">{item.value}</Col>
      </Row>
    ))

  }
  componentDidMount() {
    const { dispatch, userInfo: { token } } = this.props
    dispatch(getBusinessInfos(token))
  }

  editMsg = () => {
    this.props.history.push('edit_infos')
  }

  render() {
    const {
      businessInfos: {
        biz_name, brand, website, biz_intro, merchant_state, category_id, biz_type
      }
    } = this.props
    return (
      <Layout className="bs-info-box">
        <header>
          <Row className="">
            <Col span={3} className="content-title">商家信息</Col>
            <Col className="describe" offset={1} >BUSINESS INFOMATION</Col>
          </Row>
        </header>

        <article>
          <Row className="row-box" type="flex">
            <Col span={3} className="content-title-label">企业名称：</Col>
            <Col className="content-title-text">{biz_name}</Col>
            <Col className="describe flex-grow-1">上季度盈利量级：千万元</Col>
          </Row>
          <Row className="row-box" type="flex">
            <Col span={3} className="content-title-label">主营品牌：</Col>
            <Col className="content-title-text" >{brand}</Col>
          </Row>
          <Row className="row-box" type="flex">
            <Col span={3} className="content-title-label">供应商简介：</Col>
            <Col className="content-title-text">{biz_intro}</Col>
          </Row>
          <Row className="row-box" type="flex">
            <Col span={3} className="content-title-label">官网地址：</Col>
            <Col className="content-title-text">{website}</Col>
          </Row>
          <Row type="flex" align="middle" className="row-box">
            <Col span={3} className="content-title-label">商家状态：</Col>
            <Col className="content-title-text">{merchant_state}</Col>
            <Col offset={1}><Button>续约</Button></Col>
            <Col className="describe">有效期至：2019年1月28日</Col>
          </Row>
          <Row className="row-box" type="flex">
            <Col span={3} className="content-title-label">类目：</Col>
            <Col className="content-title-text">{category_id}</Col>
          </Row>
          <Row className="row-box" type="flex">
            <Col span={3} className="content-title-label">商家类型：</Col>
            <Col className="content-title-text">{biz_type}</Col>
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

const mapStateToProps: any = ({ businessInfos, userInfo }: any) => ({
  businessInfos,
  userInfo
})

const mapDispatchToProps: any = (dispatch: any) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Infos)