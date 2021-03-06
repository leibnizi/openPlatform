import * as React from 'react'
import { connect } from 'react-redux';
import { Table, DatePicker, Button, Input } from 'antd'
import './afterSale.less'
import { getFormatDate } from '../../../helper/utils'
import request from '../../../services/httpRequest'
import * as Cookies from 'js-cookie'
import * as moment from 'moment'
const { MonthPicker } = DatePicker
const monthFormat = 'YYYY-MM-DD'

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
      end: moment(),
      after_sale_type_list: null
    }
  }

  componentDidMount() {
    this.getTableData(1)
    request('/api/financial/after_sale_type_list')
      .then((res:any) => {
        if (res) {
          this.setState({ after_sale_type_list: res.data })
        }
      })
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
    request('/api/financial/after_sale_list', {
      params: {
        perPage: 20,
        page: nextPage,
        id,
        product_code,
        supplier_pro_num,
        product_name,
        type,
        begin: begin ? `${getFormatDate(begin._d, 'yyyy-MM-dd hh:mm:ss').slice(0,10)} 00:00:00` : '',
        end: end ? `${getFormatDate(end._d, 'yyyy-MM-dd hh:mm:ss').slice(0,10)} 24:00:00` : ''
      }
    })
      .then((res) => {
        if (res) {
          const listData = res.data.list
          listData.map((item: any, index: number) => {
            Object.assign(item, { key: index })
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
    this.setState({ currentPage: e.current })
    this.getTableData(e.current)
  }

  excel = () => {
    window.open(`http://open-erp.test.msparis.com/api/financial/after_sale_list_export?token=${Cookies.getJSON('token')}`)
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
        dataIndex: 'erp_after_no_created_at',
        align: 'center',
      },
    ];

    const { listData, end, begin, after_sale_type_list, loading, pageTotal, currentPage } = this.state

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
              {
                after_sale_type_list && Object.keys(after_sale_type_list).map((item: any, index: number) =>
                  <option key={index} value={item}>{after_sale_type_list[item]}</option>
                )
              }
            </select>
          </div>
          <div className='item'>
            <p>开始时间:</p>
            <DatePicker
              className='itemTime'
              onChange={(e: any) => this.setState({ begin: e })}
              format={monthFormat} placeholder='' allowClear={true}
            />
          </div>
          <div className='item'>
            <p>结束时间:</p>
            <DatePicker
              className='itemTime'
              onChange={(e: any) => this.setState({ end: e })}
              format={monthFormat} placeholder='' defaultValue={end} allowClear={true}
            />
          </div>
        </section>
        <section className='productmid'>
          <Button
            type="primary"
            onClick={() => this.queryData()}
          >
            查询
          </Button>
          <Button
            onClick={this.excel}
          >
            导出Excel
          </Button>
          {/* <img src={require('../../../styles/img/exclamation.png')} />
          <p>有效库存:可被租赁或者售卖的所属权为该供应商的商品库存</p> */}
        </section>
        <hr />
        <section>
          <Table
            className='producttab'
            columns={columns}
            dataSource={listData}
            bordered={true}
            scroll={{ x: '100%' }}
            loading={loading}
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

const mapStateToProps: any = (state: object) => ({
  state: state
})

export default connect(mapStateToProps)(AfterSale)
