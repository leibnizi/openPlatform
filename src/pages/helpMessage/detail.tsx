import * as React from 'react'
import { connect } from 'react-redux'
import request from '../../services/httpRequest'
// import { TimePicker, Table, Button } from 'antd'
import './index.less'

class HelpDetail extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = {
      dataList: null,
    }
  }

  componentDidMount() {
    const token = this.props.state.userInfo.token
    const { pathname } = this.props.location
    request(`/api/message/detail/${pathname.split('/').slice(-1)[0]}?token=${token}`)
      .then(res => this.setState({ dataList: res.data.data }))
  }

  render() {
    const { dataList } = this.state
    return (
      <div className='detail'>
        <p className='detailHead'>{dataList && dataList.title}</p>
        <p className='detailContent'>{dataList && dataList.content}</p>
        <p className='detailFoot'>{dataList && dataList.created_at}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HelpDetail)