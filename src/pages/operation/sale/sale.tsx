import * as React from 'react'
import { connect } from 'react-redux'
import { Table, TimePicker } from 'antd'
import './sale.less'
import { getFormatDate } from '../../../helper/utils'

class Sale extends React.Component<any, any> {
  constructor(props: Object) {
    super(props)
    this.state = {
      productDetail: false,
      startTime: null,
      endTime: null,
      product_spu: '',
      m_order_no: '',
      split_order_no: '',
      status: '',
      pageTotal: '',
      currentPage: 1,
      listData: []
    }
  }

  componentDidMount() {
    this.getTableData(1)
  }

  getTableData = (nextPage: number) => {
    const {
      product_spu,
      m_order_no,
      split_order_no,
      status,
      startTime,
      endTime
    } = this.state
    const token = this.props.state.userInfo.token
    const url = `/api/product/list?perPage=${20}&token=${token}
                &product_spu=${product_spu}&m_order_no=${m_order_no}
                &split_order_no=${split_order_no}&status=${status}
                &order_time[]=${startTime ? getFormatDate(startTime._d, 'yyyy-MM-dd hh:mm:ss') : ''}
                &order_time[]=${endTime ? getFormatDate(endTime._d, 'yyyy-MM-dd hh:mm:ss') : ''}`
    fetch(url)
      .then(res => res.json())
      .then((res) => {
        const listData = res.data.data
        listData.map((item: any, index: number) => {
          Object.assign(item, { key: index })
        })
        this.setState({
          listData,
          pageTotal: res.data.total
        })
      })
  }

  queryData = () => {
    this.getTableData(1)
  }

  pageChange = (e: any) => {
    this.setState({ currentPage: e.current })
    this.getTableData(e.current)
  }

  render() {
    const columns: any[] = [
      {
        title: '订单编号',
        dataIndex: 'product_spu',
        render: (text: string) => <a href="#">{text}</a>
      }, {
        title: '子订单编号',
        className: 'column-money',
        dataIndex: 'money'
      }, {
        title: '商品编号',
        dataIndex: 'code'
      }, {
        title: '商品主图',
        dataIndex: 'pinpai'
      }, {
        title: '订单状态',
        dataIndex: 'enabled'
      }, {
        title: '支付状态',
        dataIndex: 'chuangjianshijian'
      }, {
        title: '下单时间',
        dataIndex: 'shangjianshijian'
      }, {
        title: '操作',
        dataIndex: 'zhuangtgai'
      }
    ];

    const {
      productDetail,
      startTime,
      endTime,
      pageTotal,
      currentPage,
      listData
     } = this.state
    if (!productDetail) {
      return (
        <div className='operationproduct'>
          <header className='productheader'>订单列表-销售订单</header>
          <section>
            <div className='item'>
              <p>商品编号:</p>
              <input
                onChange={(e) => this.setState({ product_spu: e.target.value })}
              />
            </div>
            <div className='item'>
              <p>订单编号:</p>
              <input
                onChange={(e) => this.setState({ m_order_no: e.target.value })}
              />
            </div>
            <div className='item'>
              <p>子订单编号:</p>
              <input
                onChange={(e) => this.setState({ split_order_no: e.target.value })}
              />
            </div>
            <div className='item'>
              <p>订单状态:</p>
              <input
                onChange={(e) => this.setState({ status: e.target.value })}
              />
            </div>
            <div className='item'>
              <p>支付状态:</p>
              <input
                onChange={(e) => this.setState({ product_spu: e.target.value })}
              />
            </div>
            <div className='item'>
              <p>下单时间:</p>
              <TimePicker
                value={startTime}
                onChange={(e: any) => this.setState({ startTime: e })}
              />
              <TimePicker
                value={endTime}
                onChange={(e: any) => this.setState({ endTime: e })}
              />
            </div>
          </section>
          <section className='productmid'>
            <span>查询</span>
            <img src={require('../../../styles/img/exclamation.png')} />
            <p>有效库存:可被租赁或者售卖的所属权为该供应商的商品库存</p>
          </section>
          <hr />
          <section>
            <Table 
              className='producttab' 
              columns={columns} 
              dataSource={listData} 
              bordered={true} 
              pagination={{
                total: pageTotal,
                defaultCurrent: currentPage,
                pageSize: 20
              }}
              onChange={(e) => this.pageChange(e)}
            />
          </section>
        </div>
      )
    } else {
      return (
        <div className='productdetail'>
          <header className='productheader'>销售订单详情页</header>
            <section className='productmid'>
              {
                [
                  ['商品编号:', 'DD071A'], 
                  ['商品名称:', '简约休闲针织外套'], 
                  ['类目:', '女装'], 
                  ['品牌:', 'MIRROR FUN'], 
                  ['上架状态:', 'DD071A'], 
                  ['创建时间：', 'YYYY-MM-DD hh:mm:ss'], 
                  ['上架时间：', 'YYYY-MM-DD hh:mm:ss']
                ].map((item, index) =>
                  <div className='productmiditem' key={index}>
                    <span>{item[0]}</span>
                    <span>{item[1]}</span>
                  </div>
                )
              }
            </section>
            <hr />
            <section>
              <Table 
                className='producttable' 
                columns={columns} 
                dataSource={listData} 
                bordered={true} 
                pagination={{
                  total: pageTotal,
                  defaultCurrent: currentPage,
                  pageSize: 20
                }}
                onChange={(e) => this.pageChange(e)}
              />
            </section>
        </div>
      )
    }
  }
}

const mapStateToProps: any = (state: object) => ({
  state: state
})

export default connect(mapStateToProps)(Sale)
