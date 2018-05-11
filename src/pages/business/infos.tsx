import * as React from "react";
import { connect } from 'react-redux'
import { Layout, Row, Col, Button } from 'antd';
import { Link } from "react-router-dom"

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
    const { dispatch } = this.props
    dispatch(getBusinessInfos())
  }

  stopDefault = (e) => {
    // this.props.history.push('edit_infos')
    e.preventDefault()
  }

  render() {
    const {
      businessInfos: {
        biz_name, brand, website, biz_intro, merchant_state, category_id, biz_type, cooperation_term, profit_level_original, categoryText
      }
    } = this.props;
    let categoryTextHtml = '';
    categoryText && categoryText.map( item => {
      categoryTextHtml += item + '&nbsp;&nbsp;&nbsp;&nbsp'
    })

    return (
      <Layout className="bs-info-box">
        <header>
          <Row className="">
            <Col span={3} className="content-title">商家信息</Col>
          </Row>
        </header>

        <article>
          <Row className="row-box" type="flex">
            <Col span={3} className="content-title-label">企业名称：</Col>
            <Col className="content-title-text">{biz_name}</Col>
            <Col offset={1} className="describe flex-grow-1">上季度盈利量级：{profit_level_original}</Col>
          </Row>
          <Row className="row-box" type="flex">
            <Col span={3} className="content-title-label">主营品牌：</Col>
            <Col className="content-title-text" >{brand}</Col>
          </Row>
          <Row className="row-box" type="flex">
            <Col span={3} className="content-title-label">供应商简介：</Col>
            <Col className="content-title-text">{biz_intro || '暂无简介'}</Col>
          </Row>
          <Row className="row-box" type="flex">
            <Col span={3} className="content-title-label">官网地址：</Col>
            <Col className="content-title-text">{website}</Col>
          </Row>
          <Row type="flex" align="middle" className="row-box">
            <Col span={3} className="content-title-label">商家状态：</Col>
            <Col className="content-title-text">{merchant_state}</Col>
            <Col offset={1} className="describe">有效期至：{ cooperation_term && cooperation_term.substring(0, 11)}</Col>
          </Row>
          <Row className="row-box" type="flex">
            <Col span={3} className="content-title-label">类目：</Col>
            <Col className="content-title-text"><div dangerouslySetInnerHTML={{ __html: categoryTextHtml }}></div></Col>
          </Row>
          <Row className="row-box" type="flex">
            <Col span={3} className="content-title-label">商家类型：</Col>
            <Col className="content-title-text">{biz_type}</Col>
          </Row>
          <Row className="line" />
          {this.renderContentItems()}
          <Row className="edit-msg">
            <Button type="primary" onClick={(e) => this.stopDefault(e)}>
              <Link to="/business/edit_infos">
                修改商家信息
              </Link>
            </Button>
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