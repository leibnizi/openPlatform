import * as React from 'react'
import { connect } from 'react-redux';
import { Table, TimePicker } from 'antd'
import './afterSale.less'
import { getFormatDate } from '../../../helper/utils'

class AfterSale extends React.Component<any, any> {
  constructor(props: Object) {
    super(props)
    this.state = {
      id: '',
      product_code: '',
      supplier_pro_num: '',
      product_name: '',
      type: '',
      begin: null,
      end: null,
    }
  }

  componentDidMount() {
    this.getTableData(1)
  }

  getTableData = (nextPage: number) => {
    const {
      id,
      product_code,
      supplier_pro_num,
      product_name,
      type,
      begin,
      end
    } = this.state
    const token = this.props.state.userInfo.token
    const url = `/api/financial/after_sale_list?perPage=${20}&token=${token}
                &id=${id}&product_code=${product_code}
                &supplier_pro_num=${supplier_pro_num}&product_name=${product_name}
                &type=${type}
                &begin=${begin ? getFormatDate(begin._d, 'yyyy-MM-dd hh:mm:ss') : ''}
                &end=${end ? getFormatDate(end._d, 'yyyy-MM-dd hh:mm:ss') : ''}`
    fetch(url)
      .then(res => res.json())
      .then((res) => {
        const listData = res.data.list
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
        title: '售后单编号',
        dataIndex: 'id',
        align: 'center',
      }, {
        title: '商品名称',
        dataIndex: 'product_name',
        align: 'center',
      }, {
        title: '商品编号',
        dataIndex: 'product_code',
        align: 'center',
      }, {
        title: '商品模式',
        dataIndex: 'order_type',
        align: 'center',
      }, {
        title: '商品尺码',
        dataIndex: 'specification',
        align: 'center',
      }, {
        title: '供应商货号',
        dataIndex: 'supplier_pro_num',
        align: 'center',
      }, {
        title: '数量',
        dataIndex: 'num',
        align: 'center',
      }, {
        title: '售后金额',
        dataIndex: 'prices',
        align: 'center',
      }, {
        title: '售后单总金额',
        dataIndex: 'after_sale_prices',
        align: 'center',
      }, {
        title: '售后单类型',
        dataIndex: 'type',
        align: 'center',
      }, {
        title: '创建时间',
        dataIndex: 'updated_at',
        align: 'center',
      }, 
    ];

    const { listData, end, begin } = this.state

    return (
      <div className='operationproduct'>
        <header className='productheader'>售后管理</header>
        <section>
          <div className='item'>
            <p>售后单编号:</p>
            <input
              onChange={(e) => this.setState({ id: e.target.value })}
            />
          </div>
          <div className='item'>
            <p>商品编号:</p>
            <input
              onChange={(e) => this.setState({ product_code: e.target.value })}
            />
          </div>
          <div className='item'>
            <p>供应商货号:</p>
            <input
              onChange={(e) => this.setState({ supplier_pro_num: e.target.value })}
            />
          </div>
          <div className='item'>
            <p>商品名称:</p>
            <input
              onChange={(e) => this.setState({ product_name: e.target.value })}
            />
          </div>
          <div className='item'>
            <p>售后单类型:</p>
            <select
              onChange={(e) => this.setState({ type: e.target.value })}
            >
              <option value="">全部</option>
              <option value="0">未上架</option>
              <option value="1">已上架</option>
              <option value="2">待上架</option>
            </select>
          </div>
          <div className='item'>
            <p>开始时间:</p>
            <TimePicker
              className='itemTime'
              value={begin}
              onChange={(e: any) => this.setState({ startTime: e })}
            />
          </div>
          <div className='item'>
            <p>结束时间:</p>
            <TimePicker
              className='itemTime'
              value={end}
              onChange={(e: any) => this.setState({ endTime: e })}
            />
          </div>
        </section>
        <section className='productmid'>
          <span
            onClick={()=>this.queryData()}
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
          />
        </section>
      </div>
    )
  }
}

const mapStateToProps: any = (state: object) => ({
  state: state
})

export default connect(mapStateToProps)(AfterSale)