import * as React from 'react'
import { connect } from 'react-redux'
// import { fetchUtil } from '../../services/httpRequest'
import './userhead.less'

class UserHead extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {

    }
  }

  // componentDidMount() {
  //   fetchUtil('api/login', { name: '12', mobile: '1221' }).then(v => console.log('login', v))
  // }

  // loginin = (e: any) => {
  //   e.preventDefault()
  //   fetchUtil('/api/login', body)
  //     .then((v: {status_code: number}) => {
  //       if (v.status_code === 0) {
  //         console.log('status_code', v)
  //         this.props.setUserInfo(v)
  //         this.props.history.push('/')
  //       }
  //     })
  // }

  loginOut = () => {
    fetch(`/api/logout?token=${this.props.state.userInfo.token}`)
      .then(res=>res.json())
      .then(v=>console.log(v))
  }

  render() {
    // const { modalshow, loading, id, password } = this.state
    return (
      <header className='header'>
        <span>用户名</span>
        <span className='symbol'>|</span>
        <span>女神派</span>
        <span className='symbol'>|</span>
        <span 
          onClick={()=>this.loginOut()}
        >
          安全退出
        </span>
      </header>
    )
  }
}

const mapStateToProps:any = (state:object) => ({
  state:state
})

const mapDispatchToProps:any = (dispatch:any) => ({
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(UserHead)