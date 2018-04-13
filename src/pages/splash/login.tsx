import * as React from 'react'
import { connect } from 'react-redux'
import './index.less'
import { setUserInfo } from '../../redux/actions'
import { fetchUtil } from '../../services/httpRequest'

class Login extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      id: '',
      password: '',
      // modalshow: false,
      // loading: false
    }
  }

  // componentDidMount() {
  //   fetchUtil('api/login', { name: '12', mobile: '1221' }).then(v => console.log('login', v))
  // }

  loginin = (e: any) => {
    e.preventDefault()
    fetchUtil('api/login', { mobile: '13564779346', password:'123456' })
      .then((v: {status_code: number}) => {
        if (v.status_code === 0) {
          console.log('status_code', v)
          this.props.setUserInfo(v)
          this.props.history.push('/')
        }
      })
  }

  handleChangeId = (id: string) => {
    this.setState({ id })
  }

  handleChangePass = (password: string) => {
    this.setState({ password })
  }

  render() {
    // const { modalshow, loading, id, password } = this.state
    return (
      <div className='splash'>
        <p className='name splashchild'>商家后台管理系统</p>
        <form onSubmit={(e) => this.loginin(e)}>
          <label
            className='id'
          >
            账户
            <input type="text" value={this.state.value} onChange={(e) => this.handleChangeId(e.target.value)} />
          </label>
          <label
            className='password'
          >
            密码
            <input type="text" value={this.state.value} onChange={(e) => this.handleChangePass(e.target.value)} />
          </label>
          <p>忘记密码？</p>
          <input className='submit' type="submit" value="登录" />
        </form>
      </div>
    )
  }
}

const mapStateToProps:any = (state:object) => ({
  state:state
})

const mapDispatchToProps:any = (dispatch:any) => ({
  dispatch,
  setUserInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
