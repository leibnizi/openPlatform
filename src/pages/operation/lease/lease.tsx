import * as React from 'react'
import { connect } from 'react-redux'
import { Table, DatePicker, Button } from 'antd'
import './lease.less'
import { getFormatDate } from '../../../helper/utils'
import { operation } from '../../../redux/actions'
import request from '../../../services/httpRequest'
import * as moment from 'moment'
import 'moment/locale/zh-cn'
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';
const { getStatusList } = operation
const { MonthPicker } = DatePicker
const monthFormat = 'YYYY-MM-DD'

class Lease extends React.Component<any, any> {
  constructor(props: Object) {
    super(props)
    this.state = {
      listData: [],
      startTime: '',
      endTime: moment(),
      product_spu: '',
      m_order_no: '',
      split_order_no: '',
      status: '',
      pageTotal: 0,
      currentPage: 1,
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
      this.props.dispatch(getStatusList())
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
                order_no: res.data.order_no,
                image_url: item.image_url,
                specification_name: `${item.specification}/${subItem.option_name.name}`,
                key: `${subIndex}+${index}`,
                rental_cycle: res.data.rental_cycle,
                rental_price: item.rental_price
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
      m_order_no,
      split_order_no,
      status,
      startTime,
      endTime
    } = this.state
    request('/api/order/list/1', {
      params: {
        perPage: 20,
        _search: {
          product_spu,
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
        if (res) {
          const listData = res.data.data
          listData.map((item: any, index: number) => {
            item.key = index
            item.code = item.codes.join(',')
            item.image = item.images[0]
          })
          this.setState({
            listData,
            pageTotal: res.data.total,
            loading: false
          })
        }
      })
  }

  queryData = () => {
    this.setState({ loading: true })
    this.getTableData(1)
  }

  pageChange = (e: any) => {
    this.setState({ currentPage: Number(e.current) })
    this.getTableData(e.current)
  }

  render() {
    const { hoverImg } = this.state
    const columns: any[] = [
      {
        title: '订单编号',
        dataIndex: 'm_order_no',
        key: 'm_order_no',
        align: 'center',
      }, {
        title: '子订单编号',
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
        key: 'image',
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
        title: '下单时间',
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
      }, {
        title: '租赁周期',
        dataIndex: 'rental_cycle',
        key: 'rental_cycle',
        align: 'center',
      }, {
        title: '操作',
        dataIndex: 'id',
        key: 'chakanxiangqing',
        align: 'center',
        render: (e: any) => {
          return (
            <Button
              className='checkDetail'
              onClick={() => {
                this.props.history.push(`/operation/lease/detail/${e}`)
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
        render: (img: any) => {
          return (
            <img
              src={`${img}`}
              alt="mainImage"
            />
          )
        }
      }, {
        title: '商品规格',
        dataIndex: 'specification_name',
        key: 'specification_name',
        className: 'tableItem',
        align: 'center',

      }, {
        title: '租赁价(天)',
        dataIndex: 'rental_price',
        key: 'rental_price',
        align: 'center',
      }, {
        title: '租赁周期',
        dataIndex: 'rental_cycle',
        key: 'rental_cycle',
        align: 'center',
      }
    ]

    const {
      listData,
      startTime,
      endTime, pageTotal, currentPage,
      productDetailData, productDetailDataHead, loading
    } = this.state
    const { statusList } = this.props
    if (isNaN(Number(this.props.location.pathname.split('/').slice(-1)[0]))) {
      return (
        <div className='operationproduct'>
          <header className='productheader'>订单列表-租赁订单</header>
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
              onClick={() => this.queryData()}
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
              scroll={{ x: '100%' }}
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
          <header className='productheader'>租赁订单详情页</header>
          <section className='productmid'>
            {
              productDetailDataHead && [
                ['订单编号:', productDetailDataHead.m_order_no],
                ['子订单编号:', productDetailDataHead.split_order_no],
                ['下单时间:', productDetailDataHead.return_date],
                ['租赁周期:', productDetailDataHead.rental_cycle],
                ['订单状态:', productDetailDataHead.status]
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

const mapStateToProps: any = (state: any) => ({
  statusList: state.statusList
})

export default connect(mapStateToProps)(Lease)
