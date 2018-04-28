import * as React from 'react'
import { connect } from 'react-redux'
import { TimePicker, Table, Button } from 'antd'
import './detail.less'
import request from '../../../services/httpRequest'

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
    const token = this.props.state.userInfo.token
    let tableData: any[] = []

    request('/api/financial/info_list', {
      params: { begin: startTime, end: endTime, id: formNum }
    })
      .then((Detail: any) => {
        if (Detail) {
          Detail.data.map((item: any, index: number) =>
            tableData.push({
              amount: item.amount,
              month: item.month,
              supplier_id: item.supplier_id,
              year: item.year,
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

  download = () => {
    const { startTime, endTime, formNum } = this.state
    request('/api/financial/list_export', {
      params: { begin: startTime, end: endTime, id: formNum }
    })
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
    this.getData()
  }

  startTime = (e: any) => {
    this.setState({ startTime: e._d.getTime() })
  }

  endTime = (e: any) => {
    this.setState({ endTime: e._d.getTime() })
  }

  render() {
    const { formNum, tableData } = this.state

    const columns: any[] = [
      {
        title: '账单编号',
        dataIndex: 'supplier_id',
        key: 'supplier_id',
        align: 'center',
      }, {
        title: '账单时间',
        className: 'column-money',
        dataIndex: 'year',
        key: 'year',
        align: 'center',
      }, {
        title: '可提现金额',
        dataIndex: 'amount',
        key: 'amount',
        align: 'center',
      }, {
        title: '账单状态',
        dataIndex: 'month',
        key: 'month',
        align: 'center',
      }, {
        title: '操作',
        dataIndex: 'moshi',
        key: 'moshi',
        align: 'center',
        render: (e: any) => {
          return (
            <div className='fincialOperating'>
              <span
                className='checkDetail'
                onClick={() => this.download()}
              >
                {'下载对账明细'}
              </span>
              <span
                className='checkDetail'
                onClick={() => {
                  // this.props.history.push(`/operation/detail/${e}`)
                }}
              >
                {'查看打款回执'}
              </span>
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
            <TimePicker
              className='timePick'
              onChange={(e) => this.startTime(e)}
            />
            <span className='timeSymbol'>-</span>
            <TimePicker
              className='timePick'
              onChange={(e) => this.endTime(e)}
            />
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
