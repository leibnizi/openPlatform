import * as React from 'react'
import { connect } from 'react-redux'
import { Table, DatePicker, Button } from 'antd'
import './sale.less'
import { getFormatDate } from '../../../helper/utils'
import { operation } from '../../../redux/actions'
import request from '../../../services/httpRequest'

const { MonthPicker } = DatePicker
const monthFormat = 'YYYY/MM'

class Sale extends React.Component<any, any> {
  constructor(props: Object) {
    super(props)
    this.state = {
      startTime: null,
      endTime: null,
      product_spu: '',
      m_order_no: '',
      split_order_no: '',
      status: '',
      pageTotal: '',
      currentPage: 1,
      listData: [],
      productDetailData: null,
      productDetailDataHead: null
    }
  }

  componentDidMount() {
    if (!isNaN(Number(this.props.location.pathname.split('/').slice(-1)[0]))) {
      this.productDetail(Number(this.props.location.pathname.split('/').slice(-1)[0]))
    } else {
      this.getTableData(1)
      this.props.dispatch(operation.getStatusList())
    }
  }

  productDetail = (id: any) => {
    request('/api/order/detail', {
      params: { id }
    })
      .then((res: any) => {
        if (res.status_code === 0) {
          const productDetailData = res.data.specification_option_inner
          productDetailData.map((item: any, index: number) => {
            item.supply_price = res.data.supply_price
            item.name = res.data.product_master.name
            item.code = res.data.product_master.code
            item.image_url = res.data.image_url
            item.specification_name = `${item.specification_name}/${item.option_name.value}`
            item.key = index
          })
          this.setState({
            productDetailData,
            productDetailDataHead: res.data
          })
        }
      })
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
    request('/api/order/list/2', {
      params: {
        product_spu,
        m_order_no,
        split_order_no,
        status,
        order_time: [
          startTime ? getFormatDate(startTime._d, 'yyyy-MM-dd hh:mm:ss') : '',
          endTime ? getFormatDate(endTime._d, 'yyyy-MM-dd hh:mm:ss') : ''
        ]
      }
    })
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
        key: 'product_spu',
        align: 'center',
      }, {
        title: '子订单编号',
        className: 'column-money',
        dataIndex: 'split_order_no',
        key: 'split_order_no',
        align: 'center',
      }, {
        title: '商品编号',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
      }, {
        title: '商品主图',
        dataIndex: 'image_url',
        key: 'image_url',
        align: 'center',
        className: 'tableItem',
        render: (e: any) => {
          return (
            <img
              src={`${e}`}
              alt="mainImage"
            />
          )
        }
      }, {
        title: '订单状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
      }, {
        title: '支付状态',
        dataIndex: 'is_pay',
        key: 'is_pay',
        align: 'center',
      }, {
        title: '下单时间',
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
      }, {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        render: (id: any) => {
          return (
            <Button
              className='checkDetail'
              onClick={() => {
                this.props.history.push(`/operation/sale/detail/${id}`)
              }}
            >
              {'查看详情'}
            </Button>
          )
        }
      }
    ]

    const detailColumns: any[] = [
      {
        title: '商品编号',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
      }, {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      }, {
        title: '商品主图',
        dataIndex: 'image_url',
        key: 'image_url',
        align: 'center',
        className: 'tableItem',
        render: (e: any) => {
          return (
            <img
              src={`${e}`}
              alt="mainImage"
            />
          )
        }
      }, {
        title: '商品规格',
        dataIndex: 'specification_name',
        key: 'specification_name',
        align: 'center',
      }, {
        title: '商品结算价格',
        dataIndex: 'supply_price',
        key: 'supply_price',
        align: 'center',
      },
    ]

    const {
      startTime,
      endTime,
      pageTotal,
      currentPage,
      listData,
      productDetailData
    } = this.state
    const { statusList } = this.props
    if (isNaN(Number(this.props.location.pathname.split('/').slice(-1)[0]))) {
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
              <select
                onChange={(e) => this.setState({ status: e.target.value })}
              >
                {
                  statusList && Object.keys(statusList).map((item: any, index: number) =>
                    <option key={index} value={item}>{statusList[item]}</option>
                  )
                }
              </select>
            </div>
            <div className='item'>
              <p>支付状态:</p>
              <input
                onChange={(e) => this.setState({ product_spu: e.target.value })}
              />
            </div>
            <div className='item'>
              <p>下单时间:</p>
              <MonthPicker
                className='itemTime'
                onChange={(e: any) => this.setState({ startTime: e })}
                format={monthFormat} placeholder=''
              />
              -
              <MonthPicker
                className='itemTime'
                onChange={(e: any) => this.setState({ endTime: e })}
                format={monthFormat} placeholder=''
              />
            </div>
          </section>
          <section className='productmid'>
            <Button>查询</Button>
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
              columns={detailColumns}
              dataSource={productDetailData}
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

const mapStateToProps: any = (state: { statusList: {} }) => ({
  statusList: state.statusList
})

export default connect(mapStateToProps)(Sale)
