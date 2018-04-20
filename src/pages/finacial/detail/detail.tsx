import * as React from 'react'
import { connect } from 'react-redux'
import { TimePicker, Table } from 'antd'
import './detail.less'

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

  componentDidMount() {
    // fetch('/api/financial/info_list').then(Detail=>console.log('Detail',Detail))
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
    const { startTime, endTime, formNum } = this.state
    const token = this.props.state.userInfo.token
    let tableData: any[] = []

    fetch(`/api/financial/info_list?token=${token}&begin=${startTime}&end=${endTime}&id=${Number(formNum)}`)
      .then(res => res.json())
      .then((Detail: any) => {
        Detail.data.map((item: any, index: number) =>
          tableData.push({
            amount: item.amount,
            month: item.month,
            supplier_id: item.supplier_id,
            year: item.year
          })
        )
        this.setState({ tableData })
      })
  }

  handleChange = (e: string) => {
    this.setState({ formNum: e })
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
        render: (text: string) => <a href="#">{text}</a>
      }, {
        title: '账单时间',
        className: 'column-money',
        dataIndex: 'year'
      }, {
        title: '可提现金额',
        dataIndex: 'amount'
      }, {
        title: '账单状态',
        dataIndex: 'month'
      }, {
        title: '操作',
        dataIndex: 'moshi'
      }
    ]

    return (
      <div className='detail'>
        <p className='detailHead'>对账明细</p>
        <p>
          下单时间：
          <TimePicker onChange={(e) => this.startTime(e)} />
          -
          <TimePicker onChange={(e) => this.endTime(e)} />
        </p>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            账单编号:
            <input type="text" value={formNum} onChange={(e) => this.handleChange(e.target.value)} />
          </label>
          <input type="submit" value="查询" />
          <p>如对账单有疑问，请联系对接人</p>
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