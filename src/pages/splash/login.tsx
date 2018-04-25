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
      loginError: ''
    }
  }

  // componentDidMount() {
  //   fetchUtil('api/login', { name: '12', mobile: '1221' }).then(v => console.log('login', v))
  // }

  loginin = (e: any) => {
    e.preventDefault()
    const { id, password } = this.state
    const body = !!Number(id) ? {
      mobile: id,
      password
    } : {
        name: id,
        password
      }
    fetchUtil('/api/login', body)
      .then((v: { status_code: number,msg: string }) => {
        if (v.status_code === 0) {
          console.log('status_code', v)
          this.props.setUserInfo(v)
          this.props.history.push('/')
        } else {
          this.setState({loginError: v.msg})
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
    const { loginError } = this.state
    return (
      <div className='splash'>
        <p className='name splashchild'>商家后台管理系统</p>
        <p className='loginError'>{loginError?loginError:'   '}</p>
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
          <p
            onClick={()=>this.props.history.push('/forgetpassword')}
          >
            忘记密码？
          </p>
          <input className='submit' type="submit" value="登录" />
        </form>
      </div>
    )
  }
}

const mapStateToProps: any = (state: object) => ({
  state: state
})

const mapDispatchToProps: any = (dispatch: any) => ({
  dispatch,
  setUserInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
