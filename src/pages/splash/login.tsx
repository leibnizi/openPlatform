import * as React from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const body = !!Number(values.userName) ? {
          mobile: values.userName,
          password: values.password
        } : {
            name: values.userName,
            password: values.password
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
    const { getFieldDecorator } = this.props.form
    const FormItem = Form.Item
    return (
      <div className='splash'>
        <p className='name splashchild'>商家后台管理系统</p>
        <p className='loginError'>{loginError ? loginError : '   '}</p>
        <Form onSubmit={this.loginin} className="login-form registerForm">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(
              <div className='loginname'>
                <span>账户</span>
                <Input className='logininput' placeholder="" />
              </div>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <div className='loginpass'>
                <span>密码</span>
                <Input className='logininput' type="password" placeholder="" />
              </div>
            )}
          </FormItem>
          <p
            onClick={() => this.props.history.push('/forgetpassword')}
          >
            忘记密码？
          </p>
          <FormItem className='loginsubmit'>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
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
const WrappedNormalLoginForm = Form.create()(Login);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)