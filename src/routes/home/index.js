import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Row, Col, Card, Table } from 'antd'
import { indexChartsAct, getOnlineProduct, getUserInfos, getMerchantMessage } from '../../redux/actions'
// onIncrement, onDecrement, onIncrementIfOdd, onIncrementAsync, 
// import Page from '../../components/page/Page'
import NumBlock from './components/NumBlock'
import './index.less';
import '../../styles/common.less';
import { height } from 'window-size';
import { barChart,lineChart } from '../../components/chartBuilder/index'
import { get } from 'http';


const { Meta } = Card;
const on_sale_columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address'
  }
];

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moduleGap: {
        xs: 8,
        sm: 12,
        md: 16
      },
      on_sale_data: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号'
        }, {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号'
        }
      ]
    };


    this._options = {
      id: 'chart',
      viewport: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datas: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        name: 'test'
      },
      {
        name: 'hola',
        data: [90, 220, 30, 50, 90, 290, 110]
      }],
      legend: true,
      tooltip:true
    };

    this._lineOp = {
      id: 'line',
      viewport: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datas: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        name: 'test'
      },
      {
        name: 'hola',
        data: [90, 220, 30, 50, 90, 290, 110]
      }],
      legend: true,
      tooltip:true,
      smooth:true
    };
  }

  componentDidMount() {
    barChart(this._options)
    lineChart(this._lineOp)
    const { dispatch, userInfo: { token } } = this.props
    dispatch(getUserInfos(token))
    dispatch(indexChartsAct(token))
    dispatch(getOnlineProduct(token))
    dispatch(getMerchantMessage(token))
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.getIndexCharts,"@@@@")
  }

  rapTest(){
    fetch('api/v3/login')
    .then(rsp=>{
      console.log(rsp)
    })
  }
  toBusinessPage = () => {
    this.props.history.push('business/bsInfo')
  }
  toBillPage = () => {
    this.props.history.push('business/bill')
  }
  goTo = (toPage) => {
    this.props.history.push(toPage)
  }
// /help/announcement
  render() {
    const { moduleGap, on_sale_data } = this.state
    console.log(this.props.userInfo,"ggg")
    const { 
        userInfo: { name, created_at, updated_at }, 
        merchantMessage: { article },
        getOnlineProduct: { 
          rent_total, 
          sale_total, 
          yesterday_rent_total, 
          yesterday_sale_total, 
          category
        }
      } = this.props
    return (
    <div className="home-page">
      <Row 
        gutter={moduleGap} 
        type="flex" 
        justify="start"
        align="top"
      >
        <Col span={8}>
          <Card title={`欢迎您：${name}`}  className="card-row" bordered={false}>
            <p>上次登录：{updated_at}</p>
            <p>到期登录：YYYY年MM月DD日 hh:mm:ss</p>
            <Row type="flex" justify="space-between">
              <Col span={8}>
                <Button onClick={()=>{this.toBusinessPage()}}>商家信息</Button>
              </Col>
              <Col span={8}>
                <Button onClick={() => { this.toBillPage() }}>财务总览</Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="汇总" className="card-row" bordered={false}>
            <Row className="card-content-margin" gutter={30} type="flex" justify="space-between">
              <Col span={12}>
                <NumBlock title="租赁商品数" value={rent_total}>
                  <div className="yesterday-message">
                    昨日：{yesterday_rent_total}
                  </div>
                </NumBlock>
              </Col>
              <Col span={12}>
                <NumBlock title="销售商品数" value={sale_total}>
                  <div className="yesterday-message">
                    昨日：{yesterday_sale_total}
                  </div>
                </NumBlock>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="在架商品数据"  className="card-row" bordered={false}>
            <Row className="notice card-content-margin" gutter={10} type="flex" justify="space-between">
              <div className="ellipsis notice-item-title">{article[0].title}</div>
              <div className="ellipsis notice-item-title">{article[1].title}</div>
              <div className="ellipsis notice-item-title">{article[2].title}</div>
            </Row>
            <Row className="more-notice">
                <div onClick={() => { this.goTo("help/announcement") }} to="">
                查看更多公告
              </div>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row className="row-gutter" gutter={moduleGap} type="flex" justify="start">
        <Col span={10}>
          <Card title="在架商品数据" className="card-column" bordered={false}>
            <Row className="card-content-margin" gutter={10}>
              <Col span={12}>
                <NumBlock title="租赁商品数据" value={10}>
                </NumBlock>
              </Col>
              <Col span={12}>
                <NumBlock title="销售商品数" value={10}>
                </NumBlock>
              </Col>
            </Row>
            <Row className="no-data">
              <Col>暂无数据</Col>
            </Row>
             
            {/* <Row className="module-gutter">
              <Table dataSource={on_sale_data} columns={on_sale_columns} />
            </Row> */}

          </Card>
        </Col>
        <Col span={7}>
          <Card title="租赁数据" className="card-column" bordered={false}>
            <div className="module-gutter">
              <NumBlock title="近30天订单数" value={10}></NumBlock>
            </div>
            <div className="module-gutter">
              <NumBlock title="近30天收益金额" value={10}></NumBlock>
            </div>
            <div className="module-gutter">
              <NumBlock title="累计收益金额" value={10}></NumBlock>
            </div>
          </Card>
        </Col>
        <Col span={7}>
          <Card title="销售数据" className="card-column" bordered={false}>
            <div className="module-gutter">
              <NumBlock title="近30天订单数" value={10}></NumBlock>
            </div>
            <div className="module-gutter">
              <NumBlock title="近30天收益金额" value={10}></NumBlock>
            </div>
            <div className="module-gutter">
              <NumBlock title="累计收益金额" value={10}></NumBlock>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={moduleGap} className="row-gutter">
        <Col span={12} className="charts-box">
          <div id='chart' className="charts-item" style={{ height: '50vh' }}></div>
        </Col>
        <Col span={12} className="charts-box">
          <div id='line' className="charts-item" style={{ height: '50vh' }}></div>
        </Col>
      </Row>

      </div>)

  }
}

const mapStateToProps = ({ getIndexCharts, userInfo, merchantMessage, getOnlineProduct}) => ({
  getIndexCharts,
  userInfo,
  getOnlineProduct,
  merchantMessage
})

const mapDispatchToProps = (dispatch) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
