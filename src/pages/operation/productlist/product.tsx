import * as React from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import { GET_POSTS } from '../../../redux/actions/index'
import './product.less'

class Product extends React.Component<any, any> {
  constructor(props: Object) {
    super(props)
    this.state = {
      productDetail: false,
      headerActive: 0,
      listData: null,
      goodStatus: '',
      goodMode: '',
      goodCategory: '',
      SPU: '',
      code: '',
      name: '',
      purchaser_product_no: '',
      pageTotal: 0,
      currentPage: 0,
      productDetailData: null,
      productDetailDataHead: null
    }
  }

  componentDidMount() {
    this.queryData()
    this.props.dispatch(GET_POSTS({a:1}))
  }

  productDetail = (id: any) => {
    const token = this.props.state.userInfo.token
    fetch(`api/product/detail/${id}?token=${token}`)
      .then(res => res.json())
      .then(res => {
        if (res.status_code === 0) {
          const productDetailData = res.data.specification_option_inner
          productDetailData.map((item: any, index: number) => {
            item.purchaser_product_no = res.data.purchaser_product_no 
            item.value = res.data.specification_option_inner[index].specification_size.value
            item.sale_market_price = res.data.sale_market_price
            item.rental_price = res.data.rental_price
            item.sale_discount_price = res.data.sale_discount_price
          })
          this.setState({
            productDetail: true,
            productDetailData,
            productDetailDataHead: res.data
          })
        }
      })
  }

  getTableData = (nextPage: number) => {
    const {
      goodStatus,
      goodMode,
      goodCategory,
      SPU,
      code,
      name,
      purchaser_product_no
    } = this.state
    const token = this.props.state.userInfo.token
    const url = `/api/product/list?perPage=${20}&token=${token}&category_id=${goodCategory}&spu_enabled=${SPU}
                &mode_id=${goodMode}&enabled=${goodStatus}&code=${code}&name=${name}
                &purchaser_product_no=${purchaser_product_no}&page=${nextPage}`
    fetch(url)
      .then(res => res.json())
      .then((res) => {
        const data = res.data.data
        data.map((item: any, index: number) => {
          Object.assign(item, { key: index })
        })
        this.setState({
          listData: data,
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
        className: 'tableItem',
        dataIndex: 'code',
        key: 'code',
      }, {
        title: '商品名称',
        className: 'tableItem',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '商品主图',
        className: 'tableItem',
        dataIndex: '',
        key: 'img',
        render: (e: any) => {
          console.log('e',e)
          return (
            <img 
              src={`${e.main_image}`} 
              alt="mainImage"
            />
          )
        }
      }, {
        title: '品牌',
        className: 'tableItem',
        dataIndex: 'brand_name',
        key: 'brand_name'
      }, {
        title: '商品模式',
        className: 'tableItem',
        dataIndex: 'mode_id',
        key: 'mode_id'
      }, {
        title: '创建时间',
        className: 'tableItem',
        dataIndex: 'created_at',
        key: 'created_at'
      }, {
        title: '上架时间',
        className: 'tableItem',
        dataIndex: 'enabled_at',
        key: 'enabled_at',
        sorter: (a: any) => console.log(a)
      }, {
        title: '商品状态',
        className: 'tableItem',
        dataIndex: 'enabled',
        key: 'enabled',
      }, {
        title: '租赁订单量',
        className: 'tableItem',
        dataIndex: 'rental_order_count',
        key: 'rental_order_count'
      }, {
        title: '销售订单量',
        className: 'tableItem',
        dataIndex: 'sale_order_count',
        key: 'sale_order_count'
      }, {
        title: '有效缓存',
        className: 'tableItem',
        dataIndex: 'stock',
        key: 'stock',
      }, {
        title: '操作',
        className: 'tableItem',
        dataIndex: 'id',
        key: 'id',
        render: (e: any) => {
          return (
            <span
              className='checkDetail'
              onClick={() => this.productDetail(e)}
            >
              {'查看详情'}
            </span>
          )
        }
      }
    ]

    const detailColumn: any[] = [
      {
        title: '规格',
        className: 'tableItem',
        dataIndex: 'specification_name',
        key: 'specification_name',
      }, {
        title: '规格项',
        className: 'tableItem',
        dataIndex: 'value',
        key: 'value'
      }, {
        title: '商品货号',
        className: 'tableItem',
        dataIndex: 'purchaser_product_no',
        key: 'purchaser_product_no'
      }, {
        title: '有效库存',
        className: 'tableItem',
        dataIndex: 'stock',
        key: 'stock'
      }, {
        title: '市场价',
        className: 'tableItem',
        dataIndex: 'sale_market_price',
        key: 'sale_market_price'
      }, {
        title: '租赁价(天)',
        className: 'tableItem',
        dataIndex: 'rental_price',
        key: 'rental_price'
      }, {
        title: '售卖价',
        className: 'tableItem',
        dataIndex: 'sale_discount_price',
        key: 'sale_discount_price'
      },
    ]

    const { 
      productDetail, headerActive, listData, currentPage, pageTotal, productDetailData,
      productDetailDataHead 
    } = this.state
    if (!productDetail) {
      return (
        <div className='operationproduct'>
          <header className='productheader'>商品列表</header>
          <section>
            <div className='item'>
              <p>商品编号:</p>
              <input
                onChange={(e) => this.setState({ code: e.target.value })}
              />
            </div>
            <div className='item'>
              <p>商品名称:</p>
              <input
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div className='item'>
              <p>商品货号:</p>
              <input
                onChange={(e) => this.setState({ purchaser_product_no: e.target.value })}
              />
            </div>
            <div className='item'>
              <p>商品状态:</p>
              <select
                onChange={(e) => this.setState({ goodStatus: e.target.value })}
              >
                <option value="">全部</option>
                <option value="0">未上架</option>
                <option value="1">已上架</option>
                <option value="2">待上架</option>
              </select>
            </div>
            <div className='item'>
              <p>商品模式:</p>
              <select
                onChange={(e) => this.setState({ goodMode: e.target.value })}
              >
                <option value="">全部</option>
                <option value="1">常服包月</option>
                <option value="2">礼服次用</option>
                <option value="3">售卖商城</option>
              </select>
            </div>
            <div className='item'>
              <p>商品类目:</p>
              <select
                onChange={(e) => this.setState({ goodCategory: e.target.value })}
              >
                <option value="">全部</option>
                <option value="1">日常服</option>
                <option value="2">礼服</option>
                <option value="3">环保袋</option>
                <option value="4">服装</option>
                <option value="5">童装</option>
              </select>
            </div>
            <div className='item'>
              <p>SPU是否启用:</p>
              <select
                onChange={(e) => this.setState({ SPU: e.target.value })}
              >
                <option value="0">全部</option>
                <option value="1">启用</option>
                <option value="0">不启用</option>
              </select>
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
          <header className='productheader'>商品详情页</header>
          <section className='producttab'>
            <span
              className={headerActive === 0 ? 'tabactive' : 'tabnormal'}
              onClick={() => this.setState({ headerActive: 0 })}
            >
              基本信息
            </span>
            <span
              className={headerActive === 1 ? 'tabactive' : 'tabnormal'}
              onClick={() => this.setState({ headerActive: 1 })}
            >
              图片
            </span>
          </section>
          {
            headerActive === 0 ? (
              <div>
                <section className='productmid'>
                  {
                    [
                      ['商品编号:', productDetailDataHead.code],
                      ['商品名称:', productDetailDataHead.name],
                      ['品牌:', productDetailDataHead.brand_name],
                      ['上架状态:', productDetailDataHead.enabledStatus],
                      ['创建时间：', productDetailDataHead.created_at],
                      ['上架时间：', productDetailDataHead.enabled_at]
                    ].map((item, index) =>
                      <div className='productmiditem' key={index}>
                        <span>{item[0]}</span>
                        <span>{item[1]}</span>
                      </div>
                    )
                  }
                  {/* <div className='productmiditem' key='1'>
                    <span>商品编号</span>
                    <span>{item[1]}</span>
                  </div> */}
                </section>
                <hr />
                <section>
                  <Table
                    className='producttable'
                    columns={detailColumn}
                    dataSource={productDetailData}
                    bordered={true}
                  />
                </section>
              </div>
            ) : (
                <div>
                  null
                </div>
              )
          }

        </div>
      )
    }
  }
}

const mapStateToProps: any = (state: object) => ({
  state: state
})

const mapDispatchToProps: any = (dispatch: any) => ({
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)