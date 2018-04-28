import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Row, Col, Card, Table } from 'antd'
import { indexChartsAct, getOnlineProduct, getUserInfos, getMerchantMessage, getThirtyMessage, getFinancialView } from '../../redux/actions'
// onIncrement, onDecrement, onIncrementIfOdd, onIncrementAsync, 
// import Page from '../../components/page/Page'
import NumBlock from './components/NumBlock'
import './index.less';
import '../../styles/common.less';
import { height } from 'window-size';
// import { barChart,lineChart } from '../../components/chartBuilder/index'
// import { get } from 'http';
import ReactEcharts from 'echarts-for-react';


const { Meta } = Card;

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moduleGap: {
        xs: 8,
        sm: 12,
        md: 16
      },
      dongZuLv:{},
      dongXiaoLv: {},
      rentalOrder: {},
      rentalIncome: {},
      saleOrder:{},
      saleIncome:{}
    };


    this._options = {
      id: 'chart',
      viewport:  [120, 200, 150, 80, 70, 110, 130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130],
      datas: [{
        data: [120, 200, 150, 80, 70, 110, 130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130],
        name: '租赁订单数趋势图'
      }],
      legend: false,
      tooltip: true,
      color: ['#006699']
    };

    this._lineOp = {
      id: 'line',
      viewport: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datas: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        name: 'test'
      }],
      legend: false,
      tooltip:true,
      smooth:true
    };
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getUserInfos())
    dispatch(indexChartsAct())
    dispatch(getOnlineProduct())
    dispatch(getMerchantMessage())
    dispatch(getThirtyMessage())
    dispatch(getFinancialView())
  }
  componentWillReceiveProps(nextProps) {
    const { thirtyMessageData, thirtyMessageData: { dynamic_rate }, getIndexCharts } = nextProps
    
    if (getIndexCharts.rental && dynamic_rate ) {
      const { rental, sale } = getIndexCharts
      this.setState({
        dongZuLv: this.dataToCharts("动租率", dynamic_rate.rental),
        dongXiaoLv: this.dataToCharts("动销率", dynamic_rate.sale),
        // 租赁订单趋势图
        rentalOrder: this.dataToCharts("租赁订单趋势图", rental.order, 'bar'),
        rentalIncome: this.dataToCharts("租赁收益趋势图", rental.income, 'bar'),
        saleOrder: this.dataToCharts("销售订单趋势图", sale.order, 'bar'),
        saleIncome: this.dataToCharts("销售收益趋势图", sale.income, 'bar'),
      })
    }
  }

  dataToCharts = (title, data ,type = 'line') => {
    const baseData = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      // toolbox: {
      //   feature: {
      //     saveAsImage: {}
      //   }
      // },
      grid: {
        // top:"5%",
        // left: '5%',
        // right: '5%',
        // bottom: '5%',
        // containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: [1,2,3,4,5,6],
          nameTextStyle:{
            color: '#DD748E'
          },
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '动租率',
          type,
          stack: '总量',
          areaStyle: { normal: {} },
          data: [120, 132, 101, 134, 90, 230, 210],
          barMaxWidth: 10,
          itemStyle: {
            normal: {
              color: '#dd748e',
            }
          },
        }
      ]
    };
    if (data) {
      baseData.title.text = title;
      baseData.xAxis[0].data =  Object.keys(data);
      baseData.series[0].data = Object.values(data);
    }

    return baseData
    // this.setState({
    //   chart1: baseData
    // })
  };

  rapTest(){
    fetch('api/v3/login')
    .then(rsp=>{
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
    const { moduleGap, dongZuLv, dongXiaoLv, saleOrder, saleIncome } = this.state
    const { 
        userInfo: { name, created_at, updated_at, expire_at }, 
        merchantMessage: { article },
        getOnlineProduct: { 
          rent_total, 
          sale_total, 
          yesterday_rent_total, 
          yesterday_sale_total, 
          category
        },
        thirtyMessageData: {
          rental_sale,
          dynamic_rate,
        },
        getFinancialView:{
          balance_available,
          balance_total,
          income_total
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
        <Col span={6}>
          <Card title={`欢迎您：${name}`}  className="card-row" bordered={false}>
            <p>上次登录：{updated_at}</p>
            <p>到期登录：{expire_at}</p>
            <Row className="index-btn-box" type="flex" justify="space-between">
              <Col span={8}>
                <Button onClick={()=>{this.toBusinessPage()}}>商家信息</Button>
              </Col>
              <Col span={8}>
                <Button type="primary" onClick={() => { this.toBillPage() }}>财务总览</Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={9}>
          <Card 
            title="汇总" 
            className="card-row explain-left" 
            extra={
              <div className="to-yesterday" >
                至昨天24点数据
              </div>}  
            bordered={false}>
            <Row className="card-content-margin" gutter={30} type="flex" justify="space-between">
              <Col span={12}>
                  <NumBlock title="累计收益" value={income_total}>
                  </NumBlock>
              </Col>
              <Col span={12}>
                  <NumBlock title="可提现现金" value={balance_total}>
                </NumBlock>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={9}>
            <Card 
              title="公告" 
              extra={
                <div onClick={() => { this.goTo("help/announcement") }}>
                  查看更多公告
                </div>}  
              className="card-row" 
              bordered={false}
            >
            <Row className="notice card-content-margin" gutter={10} type="flex" justify="space-between">
              <div className="ellipsis notice-item-title">{article[0].title}</div>
              <div className="ellipsis notice-item-title">{article[1].title}</div>
              <div className="ellipsis notice-item-title">{article[2].title}</div>
            </Row>
            <Row className="more-notice">
            </Row>
          </Card>
        </Col>
      </Row>
      <Row className="row-gutter" gutter={moduleGap} type="flex" justify="start">
        <Col span={10}>
          <Card title="在架商品数据" className="card-column" bordered={false}>
            <Row className="card-content-margin" gutter={10}>
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
            <Row className="no-data">
              <Col>暂无数据</Col>
            </Row>
          </Card>
        </Col>
        <Col span={7}>
          <Card 
            title="租赁数据" 
            className="card-column explain-left" 
            bordered={false}
            extra={
              <div className="to-yesterday" >
                至昨天24点数据
            </div>} 
          >
            <div className="module-gutter">
                <NumBlock title="近30天订单数" value={rental_sale && rental_sale.rental.orders_30 || '0'}>
                </NumBlock>
            </div>
            <div className="module-gutter">
                <NumBlock title="近30天收益金额" value={rental_sale && rental_sale.rental.income_30 || '0'}></NumBlock>
            </div>
            <div className="module-gutter">
                <NumBlock title="累计收益金额" value={rental_sale && rental_sale.rental.inconme_total || '0'}></NumBlock>
            </div>
          </Card>
        </Col>
        <Col span={7}>
          <Card 
            title="销售数据" 
            className="card-column explain-left" 
            bordered={false}
            extra={
              <div className="to-yesterday" >
                至昨天24点数据
            </div>} 
          >
            <div className="module-gutter">
              <NumBlock title="近30天订单数" value={rental_sale && rental_sale.sale.orders_30 || '0'}>
              </NumBlock>
            </div>
            <div className="module-gutter">
              <NumBlock title="近30天收益金额" value={rental_sale && rental_sale.sale.income_30 || '0'}></NumBlock>
            </div>
            <div className="module-gutter">
              <NumBlock title="累计收益金额" value={rental_sale && rental_sale.sale.inconme_total || '0'}></NumBlock>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={moduleGap} className="row-gutter">
        <Col span={12}>
          <div className="charts-items">
            <ReactEcharts
              option={this.state.dongZuLv}
              style={{ height: '350px', width: '100%' }}
              className='react_for_echarts' />
          </div>
        </Col>
        <Col span={12}>
          <div className="charts-items">
            <ReactEcharts
              option={this.state.dongXiaoLv}
              style={{ height: '350px', width: '100%' }}
              className='react_for_echarts' />
          </div>
        </Col>
      </Row>
      <Row gutter={moduleGap} className="row-gutter">
        <Col span={12}>
          <div className="charts-items">
            <ReactEcharts
              option={this.state.rentalOrder}
              style={{ height: '350px', width: '100%' }}
              className='react_for_echarts' />
          </div>
        </Col>
        <Col span={12}>
          <div className="charts-items">
            <ReactEcharts
              option={this.state.saleOrder}
              style={{ height: '350px', width: '100%' }}
              className='react_for_echarts' />
          </div>
        </Col>
      </Row>
      <Row gutter={moduleGap} className="row-gutter">
        <Col span={12}>
          <div className="charts-items">
            <ReactEcharts
              option={this.state.rentalIncome}
              style={{ height: '350px', width: '100%' }}
              className='react_for_echarts' />
          </div>
        </Col>
        <Col span={12}>
          <div className="charts-items">
            <ReactEcharts
              option={this.state.saleIncome}
              style={{ height: '350px', width: '100%' }}
              className='react_for_echarts' />
          </div>
        </Col>
      </Row>

      </div>)

  }
}

const mapStateToProps = ({ getIndexCharts, getFinancialView, userInfo, merchantMessage, getOnlineProduct, thirtyMessageData}) => ({
  getIndexCharts,
  userInfo,
  getOnlineProduct,
  merchantMessage,
  thirtyMessageData,
  getFinancialView
})

const mapDispatchToProps = (dispatch) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
