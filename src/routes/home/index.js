import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Row, Col, Card, Table } from 'antd'
import { onIncrement, onDecrement, onIncrementIfOdd, onIncrementAsync } from '../../redux/actions'
import {fetchUtil} from '../../services/httpRequest'
// import Page from '../../components/page/Page'
import NumBlock from './components/NumBlock'
import './index.less';
import '../../styles/common.less';
import { height } from 'window-size';
import { barChart,lineChart } from '../../components/chartBuilder/index'


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


  componentWillMount() {

  }

  componentDidMount() {
    barChart(this._options)
    lineChart(this._lineOp)
  }

  rapTest(){
    fetch('api/v3/login')
    .then(rsp=>{
      console.log(rsp)
    })
  }

  render() {
    const { moduleGap, on_sale_data } = this.state

    return (
    <div className="home-page">
      <Row gutter={moduleGap} type="flex" justify="start"
      align="top"

      // order={4}
      >
        <Col span={8}>
          <Card className="card-row" bordered={false}>
            <Meta title="欢迎您，用户名用户名！" description="This is the description" />
            <p>上次登录：YYYY年MM月DD日 hh:mm:ss</p>
            <p>到期登录：YYYY年MM月DD日 hh:mm:ss</p>
            <Row type="flex" justify="space-between">
              <Col span={8}>
                <Button onClick={()=>{this.rapTest()}}>商家信息</Button>
              </Col>
              <Col span={8}>
                <Button>财务总览</Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-row" bordered={false}>
            <Meta title="汇总" description="(至在昨天24点数据)" />
            <Row className="card-content-margin" gutter={10} type="flex" justify="space-between">
              <Col span={12}>
                <NumBlock title="累计收益" value={10}>
                  21123
                </NumBlock>
              </Col>
              <Col span={12}>
                <NumBlock title="可以提现现金">
                  21123
                </NumBlock>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-row" bordered={false}>
            <Meta title="公告" />
            <Row className="notice card-content-margin" gutter={10} type="flex" justify="space-between">
              <div className="ellipsis">公告标题公告标题公告标题啦啦啦啦啦啦啦</div>
              <div className="ellipsis">公告标题公告标题公告标题啦啦啦啦啦啦啦</div>
              <div className="ellipsis">公告标题公告标题公告标题啦啦啦啦啦啦啦</div>
            </Row>
            {/* <Row>
                查看更多公告
              </Row> */
            }
          </Card>
        </Col>
      </Row>
      <Row className="row-gutter" gutter={moduleGap} type="flex" justify="start">
        <Col span={10}>
          <Card className="card-column" bordered={false}>
            <Meta title="在架商品数据" />
            <Row className="card-content-margin" gutter={10}>
              <Col span={12}>
                <NumBlock title="租赁商品数据" value={10}>
                  昨日: {0}
                </NumBlock>
              </Col>
              <Col span={12}>
                <NumBlock title="销售商品数" value={10}>
                  昨日: {0}
                </NumBlock>
              </Col>
            </Row>
            <Row className="module-gutter">
              <Table dataSource={on_sale_data} columns={on_sale_columns} />
            </Row>
          </Card>
        </Col>
        <Col span={7}>
          <Card className="card-column" bordered={false}>
            <Meta title="租赁数据" description="至昨天24点数据" />
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
          <Card className="card-column" bordered={false}>
            <Meta title="销售数据" description="至昨天24点数据" />
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
        <Col span={12}>
          <div id='chart' style={{ height: '50vh' }}></div>
        </Col>
        <Col span={12}>
        <div id='line' style={{ height: '50vh' }}></div>
        </Col>
      </Row>

      </div>)

  }
}

function mapStateToProps(state) {
  return { value: state }
}

export default connect(mapStateToProps, { onIncrement, onDecrement, onIncrementIfOdd, onIncrementAsync })(Home)
