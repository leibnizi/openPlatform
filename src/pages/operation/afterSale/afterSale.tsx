import * as React from 'react'
import { connect } from 'react-redux';
import { Table } from 'antd'
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
      begin: '',
      end: ''
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
    const token = document.cookie.split('=')[1]
    const url = `/api/financial/after_sale_list?perPage=${20}&token=${token}
                &id=${id}&product_code=${product_code}
                &supplier_pro_num=${supplier_pro_num}&product_name=${product_name}
                &type=${type}
                &begin=${begin ? getFormatDate(begin._d, 'yyyy-MM-dd hh:mm:ss') : ''}
                &end=${end ? getFormatDate(end._d, 'yyyy-MM-dd hh:mm:ss') : ''}`
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

    return (
      <div className='operationproduct'>
        <header className='productheader'>售后管理</header>
        <section>
          <div className='item'>
            <p>售后订单编号:</p>
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
            <input
              onChange={(e) => this.setState({ type: e.target.value })}
            />
          </div>
          <div className='item'>
            <p>开始时间:</p>
            <input
              onChange={(e) => this.setState({ begin: e.target.value })}
            />
          </div>
          <div className='item'>
            <p>结束时间:</p>
            <input
              onChange={(e) => this.setState({ end: e.target.value })}
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
            dataSource={data} 
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