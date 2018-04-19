import * as React from 'react'
import { Table, TimePicker } from 'antd'
import './sale.less';
import Item from '../../../components/productlist/listitem'
import { getFormatDate } from '../../../helper/utils'

export default class Sale extends React.Component<any, any> {
  constructor(props: Object) {
    super(props)
    this.state = {
      productDetail: false,
      startTime: '',
      endTime: '',
      product_spu: '',
      m_order_no: '',
      split_order_no: '',
      status: '',
      pageTotal: '',
      currentPage: '',

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
    const { token } = this.props.state.userInfo
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
        title: '商品编号',
        dataIndex: 'name',
        render: (text: string) => <a href="#">{text}</a>
      }, {
        title: '商品名称',
        className: 'column-money',
        dataIndex: 'money'
      }, {
        title: '商品主图',
        dataIndex: 'address'
      }, {
        title: '品牌',
        dataIndex: 'pinpai'
      }, {
        title: '商品模式',
        dataIndex: 'moshi'
      }, {
        title: '创建时间',
        dataIndex: 'chuangjianshijian'
      }, {
        title: '上架时间',
        dataIndex: 'shangjianshijian'
      }, {
        title: '商品状态',
        dataIndex: 'zhuangtgai'
      }
    ];

    const data: any[] = [
      {
        key: '1',
        name: 'John Brown',
        money: ' ',
        address: ' '
      }, {
        key: '2',
        name: 'Jim Green',
        money: ' ',
        address: ' '
      }, {
        key: '3',
        name: 'Joe Black',
        money: ' ',
        address: ' '
      }, {
        key: '4',
        name: 'Joe Black',
        money: ' ',
        address: ' '
      }, {
        key: '5',
        name: 'Joe Black',
        money: ' ',
        address: ' '
      }, {
        key: '6',
        name: 'Joe Black',
        money: ' ',
        address: ' '
      }, {
        key: '7',
        name: 'Joe Black',
        money: ' ',
        address: ' '
      }, {
        key: '8',
        name: 'Joe Black',
        money: ' ',
        address: ' '
      }, {
        key: '9',
        name: 'Joe Black',
        money: ' ',
        address: ' '
      }, {
        key: '10',
        name: 'Joe Black',
        money: ' ',
        address: ' '
      }, {
        key: '11',
        name: 'Joe Black',
        money: ' ',
        address: ' '
      }
    ];

    const { 
      productDetail,
      startTime,
      endTime,
      pageTotal,
      currentPage
     } = this.state
    if (!productDetail) {
      return (
        <div className='operationproduct'>
          <header className='productheader'>订单列表-销售订单</header>
          <section>
            {
              ['商品编号', '商品名称', '商品货号', '商品状态', '商品模式', '商品类目', 'SPU是否启用'].map((item, index) =>
                <Item
                  key={index}
                  itemname={item}
                />
              )
            }
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
              dataSource={data} 
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
                dataSource={data} 
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
