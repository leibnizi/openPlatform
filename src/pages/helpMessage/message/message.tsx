import * as React from 'react'
import { connect } from 'react-redux'
import request from '../../../services/httpRequest'
// import { TimePicker, Table, Button } from 'antd'
import './message.less'

class Message extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = {
      listData: '',
    }
  }

  componentDidMount() {
    // fetch('/api/financial/info_list').then(Detail=>console.log('Detail',Detail))
    const token = this.props.state.userInfo.token
    request('/api/message/sys')
      .then(res => this.setState({ listData: res.data }))
  }

  render() {
    const { listData } = this.state
    console.log('listData', listData)
    return (
      <div className='message'>
        <p className='messageHead'>系统信息</p>
        {
          listData ? (
            listData.article.map((item: any, index: number) => {
              return (
                <div className='messageContent' key={index}>
                  <div className='messageTitle'>
                    <p
                      onClick={() => this.props.history.push(`/help/detail/${item.id}`)}
                    >{item.title}</p>
                    <p>{item.created_at}</p>
                  </div>
                  <hr />
                </div>
              )
            })
          ) : null
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Message)