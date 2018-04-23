import * as React from 'react'
import { connect } from 'react-redux'
import { httpGet } from '../../../services/httpRequest'
// import { TimePicker, Table, Button } from 'antd'
import './announcement.less'

class Announcement extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    // fetch('/api/financial/info_list').then(Detail=>console.log('Detail',Detail))
    const token = this.props.state.userInfo.token
    httpGet(`/api/financial/info_list?token=${token}`)
      .then(res=>console.log(res))
  }

  render() {

    return (
      <div className='announcement'>
        <p className='helpHead'>商家公告</p>

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

export default connect(mapStateToProps, mapDispatchToProps)(Announcement)