import * as React from 'react'
import { connect } from 'react-redux'
import { Table, TimePicker } from 'antd'
import './lease.less'
import { getFormatDate } from '../../../helper/utils'

class Lease extends React.Component<any, any> {
  constructor(props: Object) {
    super(props)
    this.state = {
      listData: [],
      startTime: null,
      endTime: null,
      product_spu: '',
      m_order_no: '',
      split_order_no: '',
      status: '',
      pageTotal: 0,
      currentPage: 1,
      productDetailData: null,
      productDetailDataHead: null
    }
  }

  componentDidMount() {
    this.getTableData(1)
    if (!isNaN(Number(this.props.location.pathname.split('/').slice(-1)[0]))) {
      this.productDetail(Number(this.props.location.pathname.split('/').slice(-1)[0]))
    }
  }

  productDetail = (id: any) => {
    const token = this.props.state.userInfo.token
    fetch(`/api/order/detail/${id}?token=${token}`)
      .then(res => res.json())
      .then(res => {
        console.log('res',res)
        if (res.status_code === 0) {
          const productDetailData = res.data.specification_option_inner
          productDetailData.map((item: any, index: number) => {
            // item.purchaser_product_no = res.data.purchaser_product_no
            // item.value = res.data.specification_option_inner[index].specification_size.value
            item.split_order_no = res.data.split_order_no
            item.m_order_no = res.data.order_split.m_order_no
            // item.sale_discount_price = res.data.sale_discount_price
            item.image_url = res.data.image_url
            item.key = index
            // item.shelfStatus = Number(item.enabled) === 0 ? '未上架' : Number(item.enabled) === 1 ? '已上架' : '未上架'
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
    const token = this.props.state.userInfo.token
    const url = `/api/order/list/1?perPage=${20}&token=${token}
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
    this.setState({ currentPage: Number(e.current) })
    this.getTableData(e.current)
  }

  render() {
    const columns: any[] = [
      {
        title: '订单编号',
        dataIndex: 'order_no',
        key: 'order_no',
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
        dataIndex: 'enabled',
        key: 'enabled',
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
            <span
              className='checkDetail'
              onClick={() => {
                this.props.history.push(`/operation/lease/detail/${e}`)
              }}
            >
              {'查看详情'}
            </span>
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
        dataIndex: 'enabled',
        key: 'enabled',
        align: 'center',
      }, {
        title: '租赁周期',
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
      }
    ]

    const { 
      listData, 
      startTime, 
      endTime, pageTotal, currentPage, 
      productDetailData, productDetailDataHead
     } = this.state
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
                <option value="">全部</option>
                <option value="0">未上架</option>
                <option value="1">已上架</option>
                <option value="2">待上架</option>
              </select>
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
            <span
              onClick={() => this.queryData()}
            >
              查询
            </span>
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
          <header className='productheader'>租赁订单详情页</header>
          <section className='productmid'>
            {
              productDetailDataHead&&[
                ['订单编号:', productDetailDataHead.m_order_no],
                ['子订单编号:', productDetailDataHead.split_order_no],
                ['下单时间:', productDetailDataHead.return_date],
                ['租赁周期:',  productDetailDataHead.rental_cycle],
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

export default connect(mapStateToProps)(Lease)