import * as React from 'react'
import { connect } from 'react-redux'
import * as Cookies from 'js-cookie'
import './index.less'
import { setUserInfo } from '../../redux/actions'
import request from '../../services/httpRequest'

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
    request.post('/api/login', body)
      .then((res: any) => {
        if (res.status_code === 0) {
          this.props.setUserInfo(res.data)
          this.props.history.push('/')
          Cookies.set('token', res.data.token)
          localStorage.setItem('name', res.data.name);
          localStorage.setItem('bizName', res.data.bizName);
        } else {
          this.setState({ loginError: res.msg })
        }
      })
      .catch((err: any) => this.setState({ loginError: err.msg }))
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
        <p className='loginError'>{loginError ? loginError : '   '}</p>
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
            <input type="password" value={this.state.value} onChange={(e) => this.handleChangePass(e.target.value)} />
          </label>
          <p
            onClick={() => this.props.history.push('/forgetpassword')}
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