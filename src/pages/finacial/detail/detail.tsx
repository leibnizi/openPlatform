import * as React from 'react'
import { connect } from 'react-redux'
import { DatePicker, Table, Button } from 'antd'
import * as Cookies from 'js-cookie'
import * as moment from 'moment';
import './detail.less'
import request from '../../../services/httpRequest'
import { getFormatDate } from '../../../helper/utils'

const { MonthPicker } = DatePicker
const monthFormat = 'YYYY-MM'

class Detail extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = {
      formNum: '',
      startTime: '',
      endTime: '',
      tableData: [],
    }
  }

  getData = () => {
    const { startTime, endTime, formNum } = this.state
    let tableData: any[] = []

    request('/api/financial/info_list', {
      params: {
        begin: startTime ? getFormatDate(startTime._d, 'yyyy-MM-dd hh:mm:ss') : '',
        end: endTime ? getFormatDate(endTime._d, 'yyyy-MM-dd hh:mm:ss') : '',
        id: formNum
      }
    })
      .then((Detail: any) => {
        if (Detail) {
          Detail.data.map((item: any, index: number) =>
            tableData.push({
              id: item.id,
              receipt: item.receipt,
              amount: item.amount,
              status: item.status,
              time: `${item.year}/${item.month}`,
              balance: item.balance,
              key: index
            })
          )
          this.setState({ tableData })
        }
      })
  }

  componentDidMount() {
    this.getData()
  }

  download = (id) => {
    const { startTime, endTime, formNum } = this.state
    window.open(`http://open-erp.test.msparis.com/api/financial/list_export?token=${Cookies.getJSON('token')}&begin=${startTime}&end=${endTime}&id=${id}`)
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
    this.getData()
  }

  startTime = (e: any) => {
    this.setState({ startTime: e })
  }

  endTime = (e: any) => {
    this.setState({ endTime: e })
  }

  render() {
    const { formNum, tableData, endTime, startTime } = this.state

    const columns: any[] = [
      {
        title: '账单编号',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
      }, {
        title: '账单时间',
        className: 'column-money',
        dataIndex: 'time',
        key: 'time',
        align: 'center',
      }, {
        title: '可提现金额',
        dataIndex: 'balance',
        key: 'balance',
        align: 'center',
      }, {
        title: '账单状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
      }, {
        title: '操作',
        dataIndex: '',
        key: 'moshi',
        align: 'center',
        render: (e: any) => {
          return (
            <div className='checkDiv'>
              <span
                className={e.receipt ? 'checkDetail' : 'check1'}
                onClick={() => this.download(e.id)}
              >
                {'下载对账明细'}
              </span>
              {
                e.receipt && <span
                  className='checkDetail'
                  onClick={() => {
                    if (e.receipt) {
                      window.open(e.receipt)
                    }
                  }}
                >
                  {'查看打款回执'}
                </span>
              }
            </div>

          )
        }
      }
    ]

    return (
      <div className='detail'>
        <p className='detailHead'>对账明细</p>

        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label className='formTime'>
            <span className='timeFont'>下单时间：</span>
            <MonthPicker onChange={this.startTime} format={monthFormat} placeholder='' allowClear={true} />
            <span className='timeSymbol'> - </span>
            <MonthPicker onChange={this.endTime} format={monthFormat} placeholder='' defaultValue={moment()} allowClear={true} />
          </label>
          <label className='formsecond'>
            <span>账单编号:</span>
            <input
              type="text"
              value={formNum}
              onChange={(e) => this.setState({ formNum: e.target.value })}
            />
          </label>
          <div className='querySubmit'>
            <Button
              className='querySubmitButton'
              type="primary"
              htmlType="submit"
            >
              查询
            </Button>
            <span>如对账单有疑问，请联系对接人</span>
          </div>
        </form>
        <Table
          className='producttable'
          columns={columns}
          dataSource={tableData}
          bordered={true}
        />
      </div>
    )
  }
}

const mapStateToProps: any = (state: object) => ({
  state: state
})

const mapDispatchToProps: any = (dispatch: any) => ({
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
