import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Row, Col, Card, Icon, Radio } from 'antd'
import { Link } from "react-router-dom";
import { indexChartsAct, getOnlineProduct, getUserInfos, getMerchantMessage, getThirtyMessage, getFinancialView } from '../../redux/actions'
// onIncrement, onDecrement, onIncrementIfOdd, onIncrementAsync, 
// import Page from '../../components/page/Page'
import NumBlock from './components/NumBlock'
import './index.less';
import '../../styles/common.less';
import { height } from 'window-size';
import ReactEcharts from 'echarts-for-react';

const { Meta } = Card;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const baseData = {
  title: {
    text: ''
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
  },
  xAxis: [
    {
      type: 'category',
      data: [0],
      boundaryGap: true,
      nameTextStyle: {
        color: '#DD748E'
      },
      axisLine: {
        lineStyle: {
          color: "#ccc"
        }
      },
      axisLabel: {
        formatter: function (value, index) {
          return value.substring(5)
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#fff",
        }
      },
      axisLabel: {
        color: "#ccc"
      }
    }
  ],
  series: [
    {
      name: '动租率',
      type: 'line',
      smooth: true,
      stack: '总量',
      // areaStyle: { normal: {} },
      data: [0],
      barMaxWidth: 10,
      itemStyle: {
        normal: {
          color: '#dd748e',
        }
      },
    }
  ]
};

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moduleGap: {
        xs: 8,
        sm: 12,
        md: 16
      },
      dongZuLv:baseData,
      dongXiaoLv: baseData,
      rentalOrder: baseData,
      rentalIncome: baseData,
      saleOrder:baseData,
      saleIncome:baseData,
      changedRentalOrder: baseData,
      changedRentalIncome: baseData,
      changedSaleOrder: baseData,
      changedSaleIncome: baseData,
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

    if (typeof getIndexCharts === 'object' && JSON.stringify(getIndexCharts) !== "{}" && getIndexCharts.rental && dynamic_rate ) {
      const { rental, sale } = getIndexCharts
      this.setState({
        dongZuLv: this.dataToCharts("动租率", dynamic_rate.rental),
        dongXiaoLv: this.dataToCharts("动销率", dynamic_rate.sale),
        // 租赁订单趋势图
        rentalOrder: this.dataToCharts("租赁订单趋势图", rental.order, 'bar'),
        rentalIncome: this.dataToCharts("租赁收益趋势图", rental.income, 'bar'),
        saleOrder: this.dataToCharts("销售订单趋势图", sale.order, 'bar'),
        saleIncome: this.dataToCharts("销售收益趋势图", sale.income, 'bar'),
      }, () => {
        const { saleIncome, saleOrder, rentalIncome, rentalOrder } = this.state
        this.changeDays(rentalOrder, 30, 'changedRentalOrder')
        this.changeDays(rentalIncome, 30, 'changedRentalIncome')
        this.changeDays(saleOrder, 30, 'changedSaleOrder')
        this.changeDays(saleIncome, 30, 'changedSaleIncome')
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
      grid: {
      },
      xAxis: [
        {
          type: 'category',
          data: [0],
          boundaryGap: true,
          nameTextStyle:{
            color: '#DD748E'
          },
          axisLine: {
            lineStyle: {
              color: "#ccc"
            }
          },
          axisLabel:{
            formatter: function (value, index) {
              return value.substring(5)
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine:{
            lineStyle:{
              color:"#fff",
            }
          },
          axisLabel: {
            color: "#ccc"
          }
        }
      ],
      series: [
        {
          name: '动租率',
          type,
          smooth: true,
          stack: '总量',
          // areaStyle: { normal: {} },
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
    if (data && JSON.stringify(data) !== "{}" ) {
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
  toFincialPage = () => {
    this.props.history.push('/fincial')
  }

  deepCopy = (p, c) => {
  　　　　var c = c || {};
  　　　　for (var i in p) {
    　　　　　　if (typeof p[i] === 'object') {
      if (p[i] === null) {
        c[i] = null;
      } else {
        c[i] = (p[i].constructor === Array) ? [] : {};
        this.deepCopy(p[i], c[i]);
      }
    　　　　　　} else {
      c[i] = p[i];
    　　　　　　}
  　　　　}
  　　　　return c;
　　}

  changeDays = (options ,e, key) => {
    let value = 0
    if (typeof e === 'object') {
      value = e.target.value
    }
    else if (typeof e === 'number') {
      value = e
    }
    const deepData = this.deepCopy(options)

    const data = deepData.series[0].data.filter((item, index) => {
      return index < value
    })
    const xData = deepData.xAxis[0].data.filter((item, index) => index < value)
    deepData.series[0].data = data
    deepData.xAxis[0].data = xData
    console.log(deepData.series[0].data.length,"deepDatadeepDatadeepData")
    this.setState({
      [key]: deepData
    })

    // const newData = data.slice(0, e.target.value - 1)
    // options.series[0].data = newData
    // this.setState({
    //   [key]: options
    // })
    // this.props.history.push(toPage)
  }
  render() {
    const { 
      moduleGap, dongZuLv, dongXiaoLv,
      rentalOrder, rentalIncome, saleOrder, saleIncome, 
      changedRentalOrder, changedRentalIncome, changedSaleOrder,
      changedSaleIncome, 
    } = this.state
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
      <Row className="notice-box border-radius" type="flex" justify="space-between">
        <Col>
          <div className="notice-content-box ellipsis">
            <Icon 
              type="sound" 
              style={{fontSize:"22px", color:"#999",marginRight:"20px"}}
              />
              {console.log(article,"kkj")}
              {article.length ? (<div>
                <div style={{ display: "inline-block", fontWeight: "600" }}>
                  {`${article.length && article[0].title} ：`}
                </div>
                <Link className="notice" to={`help/detail/${article.length && article[article.length - 1].id}`}>
                  {article.length && article[0].content}
                </Link>
              </div>) : '暂无公告'}
          </div>
        </Col>
        <Col>
          <Link style={{color: "#f03a80"}} to="help/announcement">
            更多 
          </Link>
        </Col>
      </Row>
      <Row 
        gutter={moduleGap} 
        type="flex" 
        justify="start"
        align="top"
      >
        <Col span={6}>
          <Card title={`欢迎您：${name || '加载中...'}`} className="card-row first-card" bordered={false}>
              <div>
                <p style={{ marginTop: '15px', textAlign: 'start' }}>上次登录：</p>
                <p style={{ textAlign: 'start' }}>到期时间：{expire_at||'加载中...'}</p>
              </div>
            <Row className="index-btn-box" type="flex" justify="space-between">
              <Col span={10}>
                <Button onClick={()=>{this.toBusinessPage()}}>商家信息</Button>
              </Col>
              <Col span={10}>
                <Button type="primary" onClick={() => { this.toFincialPage() }}>财务总览</Button>
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
            {(<Row className="card-content-margin card-content" gutter={30} type="flex" justify="space-between">
              <Col span={12}>
                <NumBlock title="累计收益" value={income_total||'0'}>
                </NumBlock>
              </Col>
              <Col span={12}>
                <NumBlock title="可提现现金" value={balance_available||'0'}>
                </NumBlock>
              </Col>
              </Row>)}
          </Card>
        </Col>
          <Col span={9}>
            <Card title="在架商品数据" className="card-row" bordered={false}>
              <Row className="card-content-margin card-content" gutter={10}>
                <Col span={12}>
                  <NumBlock title="租赁商品数" value={rent_total||'0'}>
                    <div className="yesterday-message">
                      昨日：{yesterday_rent_total||'0'}
                    </div>
                  </NumBlock>
                </Col>
                <Col span={12}>
                  <NumBlock title="销售商品数" value={sale_total||'0'}>
                    <div className="yesterday-message">
                      昨日：{yesterday_sale_total||'0'}
                    </div>
                  </NumBlock>
                </Col>
              </Row>
            </Card>
          </Col>
      </Row>
      <Row className="row-gutter" gutter={moduleGap} type="flex" justify="start">
        <Col span={12}>
          <Card 
            title="租赁数据" 
            className="card-line explain-left" 
            bordered={false}
            extra={
              <div className="to-yesterday" >
                至昨天24点数据
            </div>} 
          >
            <div className="card-content">
              <div>
                <NumBlock title="当月订单数" value={rental_sale && (rental_sale.rental && (rental_sale.rental.orders_30 || '0'))}>
                </NumBlock>
              </div>
              <div>
                <NumBlock title="当月收益金额" value={rental_sale && (rental_sale.rental && (rental_sale.rental.income_30 || '0'))}></NumBlock>
              </div>
              <div>
                <NumBlock title="累计收益金额" value={rental_sale && (rental_sale.rental && (rental_sale.rental.inconme_total || '0'))}></NumBlock>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card 
            title="销售数据" 
            className="card-line explain-left" 
            bordered={false}
            extra={
              <div className="to-yesterday" >
                至昨天24点数据
            </div>} 
          >
            <div className="card-content">
              <div>
                  <NumBlock title="当月订单数" value={rental_sale && (rental_sale.sale && (rental_sale.sale.orders_30 || '0'))}></NumBlock>
              </div>
              <div>
                  <NumBlock title="当月售后单数" value={rental_sale && (rental_sale.sale && (rental_sale.sale.after_sale_30 || '0'))}></NumBlock>
              </div>
              <div>
                  <NumBlock title="当月收益金额" value={rental_sale && (rental_sale.sale && (rental_sale.sale.income_30 || '0'))}></NumBlock>
              </div>
              <div>
                  <NumBlock title="累计收益金额" value={rental_sale && (rental_sale.sale && (rental_sale.sale.inconme_total || '0'))}></NumBlock>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={moduleGap} className="row-gutter">
        <Col span={12}>
          <div className="charts-items">
            <ReactEcharts
              option={dongZuLv}
              style={{ height: '350px', width: '100%' }}
              className='react_for_echarts' />
          </div>
        </Col>
        <Col span={12}>
          <div className="charts-items">
            <ReactEcharts
              option={dongXiaoLv}
              style={{ height: '350px', width: '100%' }}
              className='react_for_echarts' />
          </div>
        </Col>
      </Row>
      <Row gutter={moduleGap} className="row-gutter">
        <Col span={12}>
          <div className="charts-items">
            <RadioGroup
              className="tab-days"
              defaultValue={30}
              size="small"
              onChange={(e) => { this.changeDays(rentalOrder, e, 'changedRentalOrder') }}
            >
              <RadioButton value={30}>30天</RadioButton>
              <RadioButton value={90}>90天</RadioButton>
            </RadioGroup>
            <ReactEcharts
              option={changedRentalOrder}
              style={{ height: '350px', width: '100%' }}
              className='react_for_echarts' />
          </div>
        </Col>
        <Col span={12}>
          <div className="charts-items">
            <RadioGroup
                className="tab-days"
                defaultValue={30}
                size="small"
                onChange={(e) => { this.changeDays(saleOrder, e, 'changedSaleOrder') }}
              >
              <RadioButton value={30}>30天</RadioButton>
              <RadioButton value={90}>90天</RadioButton>
            </RadioGroup>
            <ReactEcharts
              option={changedSaleOrder}
              style={{ height: '350px', width: '100%' }}
              className='react_for_echarts' />
          </div>
        </Col>
      </Row>
      <Row gutter={moduleGap} className="row-gutter">
        <Col span={12}>
          <div className="charts-items">
            <RadioGroup
              className="tab-days"
              defaultValue={30}
              size="small"
              onChange={(e) => { this.changeDays(rentalIncome, e, 'changedRentalIncome') }}
            >
              <RadioButton value={30}>30天</RadioButton>
              <RadioButton value={90}>90天</RadioButton>
            </RadioGroup>
            <ReactEcharts
              option={changedRentalIncome}
              style={{ height: '350px', width: '100%' }}
              className='react_for_echarts' />
          </div>
        </Col>
        <Col span={12}>
          <div className="charts-items">
            <RadioGroup 
              className="tab-days" 
              defaultValue={30} 
              size="small"
              onChange={(e) => { this.changeDays(saleIncome, e, 'changedSaleIncome') }}
              >
              <RadioButton value={30}>30天</RadioButton>
              <RadioButton value={90}>90天</RadioButton>
            </RadioGroup>
            <ReactEcharts
              option={changedSaleIncome}
              style={{ height: '350px', width: '100%' }}
              className='react_for_echarts' />
          </div>
        </Col>
      </Row>
      <Row style={{height:"50px"}}>
        {/* ，没按照标准layout布局，内部又使用了Row和Col，
        使padding异常，临时撑开底部高度，缓兵之计 */}
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
