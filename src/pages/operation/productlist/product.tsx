import * as React from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
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
      purchaser_product_no: ''
    }
  }

  componentDidMount() {
    fetch(`/api/product/list?perPage=${1}&token=${this.props.state.userInfo.token}`)
      .then(res => res.json())
      .then((res) => {
        const data = res.data.data
        data.map((item: any, index: number) => {
          Object.assign(item, { key: index })
        })
        this.setState({ listData: data })
      })
  }

  queryData = () => {
    const {
      goodStatus,
      goodMode,
      goodCategory,
      SPU,
      code,
      name,
      purchaser_product_no
    } = this.state
    const { token } = this.props.state.userInfo
    const url = `/api/product/list?perPage=${1}&token=${token}&category_id=${goodCategory}&spu_enabled=${SPU}
                &mode_id=${goodMode}&enabled=${goodStatus}&code=${code}&name=${name}
                &purchaser_product_no=${purchaser_product_no}`
    fetch(url).then(res=>res.json())
  }

  render() {
    const columns: any[] = [
      {
        title: '商品编号',
        dataIndex: 'code',
        render: (text: string) => <a href="#">{text}</a>
      }, {
        title: '商品名称',
        className: 'column-money',
        dataIndex: 'name'
      }, {
        title: '商品主图',
        dataIndex: 'main_image'
      }, {
        title: '品牌',
        dataIndex: 'brand_name'
      }, {
        title: '商品模式',
        dataIndex: 'mode_id'
      }, {
        title: '创建时间',
        dataIndex: 'created_at'
      }, {
        title: '上架时间',
        dataIndex: 'enabled_at'
      }, {
        title: '商品状态',
        dataIndex: 'enabled'
      }
    ];

    const data: any[] = [
      {
        key: '1',
        name: 'John Brown',
        brand_name: '100',
        address: 'tokyo',
      }
    ]

    const { productDetail, headerActive, listData } = this.state
    if (!productDetail) {
      return (
        <div className='operationproduct'>
          <header className='productheader'>商品列表</header>
          <section>
            <div className='item'>
              <p>商品编号</p>
              <input 
                onChange={(e)=>this.setState({code: e.target.value})}
              />
            </div>
            <div className='item'>
              <p>商品名称</p>
              <input 
                onChange={(e)=>this.setState({name: e.target.value})}
              />
            </div>
            <div className='item'>
              <p>商品货号</p>
              <input 
                onChange={(e)=>this.setState({purchaser_product_no: e.target.value})}
              />
            </div>
            <div className='item'>
              <p>商品状态</p>
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
              <p>商品模式</p>
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
              <p>商品类目</p>
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
              <p>SPU是否启用</p>
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
            <Table className='producttab' columns={columns} dataSource={listData} bordered={true} />
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
                  <Table className='producttable' columns={columns} dataSource={data} bordered={true} />
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
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)