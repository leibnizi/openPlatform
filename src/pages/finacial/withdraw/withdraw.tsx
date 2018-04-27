import * as React from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import './withdraw.less'
import request from '../../../services/httpRequest'

class Withdraw extends React.Component<any, any> {

  constructor(props: any) {
    super(props)

    this.state = {
      listData: []
    }
  }

  componentDidMount() {
    const token = this.props.state.userInfo.token
    request('/api/financial/get_list')
      .then(res => {
        const listData = res.data
        listData.map((item: any, index: number) => {
          Object.assign(item, { key: index })
        })
        this.setState({ 
          listData
        })
      })
  }

  render() {
    const columns: any[] = [
      {
        title: '提现单编号',
        className: 'tableItem',
        dataIndex: 'financial_id',
        key: 'code',
        align: 'center'
      }, {
        title: '提现金额',
        className: 'tableItem',
        dataIndex: 'apply',
        key: 'apply',
        align: 'center'
      }, {
        title: '提现时间',
        className: 'tableItem',
        dataIndex: 'apply_date',
        key: 'apply_date',
        align: 'center'
      }, {
        title: '提现账号',
        className: 'tableItem',
        dataIndex: 'receive_account',
        key: 'receive_account',
        align: 'center'
      }, {
        title: '账户余额',
        className: 'tableItem',
        dataIndex: 'amount',
        key: 'amount',
        align: 'center'
      }, {
        title: '提现进度',
        className: 'tableItem',
        dataIndex: 'progress',
        key: 'progress',
        align: 'center'
      }
    ]

    const { listData } = this.state

    return (
      <div className='withdraw'>
        <p className='withdrawHead'>提现明细</p>
        <Table
          className='producttable'
          columns={columns}
          dataSource={listData}
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

export default connect(mapStateToProps, mapDispatchToProps)(Withdraw)