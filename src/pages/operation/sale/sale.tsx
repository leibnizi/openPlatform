import * as React from 'react'
import { connect } from 'react-redux'
import { Table, DatePicker, Button } from 'antd'
import * as moment from 'moment'
import './sale.less'
import { getFormatDate } from '../../../helper/utils'
import { operation } from '../../../redux/actions'
import request from '../../../services/httpRequest'

const { MonthPicker } = DatePicker
const monthFormat = 'YYYY-MM-DD'

class Sale extends React.Component<any, any> {
  constructor(props: Object) {
    super(props)
    this.state = {
      startTime: '',
      endTime: moment(),
      product_spu: '',
      m_order_no: '',
      pay_status: '',
      split_order_no: '',
      status: '',
      pageTotal: '',
      currentPage: 1,
      listData: [],
      productDetailData: null,
      productDetailDataHead: null,
      hoverImg: null,
      loading: true
    }
  }

  componentDidMount() {
    if (!isNaN(Number(this.props.location.pathname.split('/').slice(-1)[0]))) {
      this.productDetail(Number(this.props.location.pathname.split('/').slice(-1)[0]))
    } else {
      this.getTableData(1)
      this.props.dispatch(operation.getStatusList(2))
    }
  }

  productDetail = (id: any) => {
    request('/api/order/detail', {
      params: { id }
    })
      .then((res: any) => {
        if (res.status_code === 0) {
          const productDetailData = res.data.items
          let result: any = []
          productDetailData.map((item: any, index: number) => {
            item.specification_option_inner.map((subItem: any, subIndex: number) => {
              result.push({
                supply_price: item.supply_price,
                name: item.product_name,
                code: item.product_spu,
                id: item.product_id,
                order_no: res.data.order_no,
                image_url: item.image_url,
                specification_name: `${item.specification}/${subItem.option_name.name}`,
                key: `${subIndex}+${index}`
              })
            })
          })
      this.setState({
        productDetailData: result,
        productDetailDataHead: res.data
      })
    }
  })
}

getTableData = (nextPage: number) => {
  const {
    product_spu,
    pay_status,
    m_order_no,
    split_order_no,
    status,
    startTime,
    endTime
  } = this.state
  request('/api/order/list/2', {
    params: {
      _search: {
        product_spu,
        pay_status,
        m_order_no,
        split_order_no,
        status,
        order_time: [
          startTime ? getFormatDate(startTime._d, 'yyyy-MM-dd hh:mm:ss') : '',
          endTime ? getFormatDate(endTime._d, 'yyyy-MM-dd hh:mm:ss') : ''
        ]
      }
    }
  })
    .then((res) => {
      const listData = res.data.data
      listData.map((item: any, index: number) => {
        item.key = index
        item.code = item.codes[0]
      })
      this.setState({
        listData,
        pageTotal: res.data.total,
        loading: false
      })
    })
}

queryData = () => {
  this.setState({ loading: true })
  this.getTableData(1)
}

pageChange = (e: any) => {
  this.setState({ currentPage: e.current })
  this.getTableData(e.current)
}

render() {
  const { hoverImg } = this.state
  const columns: any[] = [
    {
      title: '订单编号',
      dataIndex: '',
      key: 'm_order_no',
      align: 'center',
      render: (e: any) => {
        return (
          <span
            className='checkDetail'
            onClick={() => {
              this.props.history.push(`/operation/sale/detail/${e.id}`)
            }}
          >
            {e.m_order_no}
          </span>
        )
      }
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
      dataIndex: '',
      key: 'image_url',
      align: 'center',
      className: 'tableItem',
      render: (e: any) => {
        return (
          <div>
            <img
              onMouseOver={() => {
                this.setState({ hoverImg: e.id })
              }}
              onMouseOut={() => this.setState({ hoverImg: false })}
              src={`${e.images[0]}`}
              alt="mainImage"
            />
            {
              e.id === hoverImg && <div className='hoverImg'>
                {
                  e.images.map((item: any, index: number) =>
                    <img
                      src={item}
                      key={index}
                      alt="mainImage"
                    />
                  )
                }
              </div>
            }
          </div>
        )
      }
    }, {
      title: '订单状态',
      dataIndex: 'order_status',
      key: 'order_status',
      align: 'center',
    }, {
      title: '支付状态',
      dataIndex: 'pay_status',
      key: 'pay_status',
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
      dataIndex: '',
      key: 'code',
      align: 'center',
      render: (e: any) => {
        return (
          <span
            className='checkDetail'
            onClick={() => {
              this.props.history.push(`/operation/detail/${e.id}`)
            }}
          >
            {e.code}
          </span>
        )
      }
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
    productDetailData,
    productDetailDataHead,
    loading
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
              <option value=''>全部</option>
              {
                statusList && Object.keys(statusList).map((item: any, index: number) =>
                  <option key={index} value={item}>{statusList[item]}</option>
                )
              }
            </select>
          </div>
          <div className='item'>
            <p>支付状态:</p>
            <select
              onChange={(e) => this.setState({ pay_status: e.target.value })}
            >
              <option value=''>全部</option>
              <option value='0'>未支付</option>
              <option value='1'>已支付</option>
            </select>
          </div>
          <div className='item'>
            <p>下单时间:</p>
            <DatePicker
              className='itemTime'
              onChange={(e: any) => this.setState({ startTime: e })}
              format={monthFormat} placeholder='' allowClear={true}
            />
            -
              <DatePicker
              className='itemTime'
              onChange={(e: any) => this.setState({ endTime: e })}
              format={monthFormat} placeholder='' defaultValue={endTime} allowClear={true}
            />
          </div>
        </section>
        <section className='productmid'>
          <Button
            onClick={this.queryData}
            type="primary"
          >
            查询
          </Button>
          <img src={require('../../../styles/img/exclamation.png')} />
          <p>有效库存:可被租赁或者售卖的所属权为该供应商的商品库存</p>
        </section>
        <hr />
        <section>
          <Table
            loading={loading}
            className='producttab'
            columns={columns}
            dataSource={listData}
            bordered={true}
            scroll={{ x: '100%' }}
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
            productDetailDataHead && [
              ['订单编号:', productDetailDataHead.m_order_no],
              ['子订单编号:', productDetailDataHead.split_order_no],
              ['下单时间:', productDetailDataHead.created_at],
              ['支付状态：', productDetailDataHead.pay_status],
              ['订单状态：', statusList[productDetailDataHead.status]]
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
            scroll={{ x: '100%' }}
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
