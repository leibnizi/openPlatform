import * as React from 'react'
import { connect } from 'react-redux'
import request from '../../../services/httpRequest'
// import { TimePicker, Table, Button } from 'antd'
import './announcement.less'

class Announcement extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = {
      listData: null
    }
  }

  componentDidMount() {
    request('/api/message/merchant')
      .then(res => {
        console.log('res',res.data)
        if (res) {
          this.setState({ listData: res.data })
        }
      })
  }

  render() {
    const { listData } = this.state
    return (
      <div className='announcement'>
        <p className='helpHead'>商家公告</p>
        {
          listData ? (
            listData.article.map((item: any, index: number) => {
              return (
                <div className='announceContent' key={index}>
                  <div className='announceTitle'>
                    <p onClick={() => this.props.history.push(`/help/detail/${item.id}`)}>{item.title}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Announcement)