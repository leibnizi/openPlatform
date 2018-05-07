import * as React from 'react'
import { connect } from 'react-redux'
import request from '../../services/httpRequest'
// import { TimePicker, Table, Button } from 'antd'
import './index.less'

class Customerservice extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = {
      dataList: null,
    }
  }

  componentDidMount() {
    request('/api/message/help')
      .then(res => {
        if (res) {
          this.setState({ dataList: res.data })
        }
      })
  }

  render() {
    const { dataList } = this.state
    console.log('dataList', dataList, !dataList)
    return (
      <div className='customer'>
        <p className='customerHead'>联系客服</p>
        <p className='customerContent'>
          客服电话：
            <span>{dataList && Object.keys(dataList).indexOf('customerService') >= 0 && dataList.customerService.tel}</span>
        </p>
        <p className='customerContent'>
          客服邮箱：
            <span>{dataList && Object.keys(dataList).indexOf('customerService') >= 0 && dataList.customerService.email}</span>
        </p>
        <hr className='minhr' />
        <p className='customerHead'>常见问题</p>
        {
          dataList ? (
            dataList.faq.map((item: any, index: number) => {
              return (
                <div className='helpContent' key={index}>
                  <p className='helpIndex'>{`${index + 1}、`}</p>
                  <div
                    className='helpTitle'
                  >
                    <p dangerouslySetInnerHTML={{ __html: item.question }}>
                      {/* {item.question} */}
                    </p>
                    <p dangerouslySetInnerHTML={{ __html: item.answer }}>
                      {/* {item.answer} */}
                    </p>
                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Customerservice)