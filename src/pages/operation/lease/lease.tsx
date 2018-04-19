import * as React from 'react'
import { connect } from 'react-redux'
import { Table, TimePicker } from 'antd'
import './lease.less'

class Lease extends React.Component<any, any> {
  constructor(props: Object) {
    super(props)
    this.state = {
      productDetail: false,
      listData: [],
      startTime: '',
      endTime: '',
      product_spu: '',
      m_order_no: '',
      split_order_no: '',
      status: '',
      pageTotal: 0,
      currentPage: 1
    }
  }

  componentDidMount () {
    this.getPageData(1)
  }

  getPageData = (nextPage:number) => {
    const { token } = this.props.state.userInfo
    fetch(`/api/product/list?perPage=${10}&token=${token}&page=${nextPage}`)
      .then(res=>res.json())
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
    const {
      product_spu,
      m_order_no,
      split_order_no,
      status
    } = this.state
    const { token } = this.props.state.userInfo
    const url = `/api/product/list?perPage=${1}&token=${token}&product_spu=${product_spu}&m_order_no=${m_order_no}
                &split_order_no=${split_order_no}&status=${status}`
    fetch(url).then(res=>res.json())
  }

  pageChange = (e:any) => {
    this.setState({currentPage:e.current})
    this.getPageData(e.current)
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

    const { productDetail, listData, startTime, endTime, pageTotal, currentPage } = this.state
    if (!productDetail) {
      return (
        <div className='operationproduct'>
          <header className='productheader'>订单列表-租赁订单</header>
          <section>
            <div className='item'>
              <p>商品编号:</p>
              <input 
                onChange={(e)=>this.setState({product_spu: e.target.value})}
              />
            </div>
            <div className='item'>
              <p>订单编号:</p>
              <input 
                onChange={(e)=>this.setState({m_order_no: e.target.value})}
              />
            </div>
            <div className='item'>
              <p>子订单编号:</p>
              <input 
                onChange={(e)=>this.setState({split_order_no: e.target.value})}
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
                onChange={(e:any)=>this.setState({startTime: e})} 
              />
              <TimePicker 
                value={endTime} 
                onChange={(e:any)=>this.setState({endTime: e})} 
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
              pagination={{total:pageTotal,defaultCurrent:currentPage}}
              onChange={(e)=>this.pageChange(e)}
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
                onChange={(e)=>console.log('e',e)}
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