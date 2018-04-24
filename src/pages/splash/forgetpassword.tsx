import * as React from 'react'
import { connect } from 'react-redux'
import './forgetpassword.less'

class Forgetpassword extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      phone: '',
      verificationCode: '',
      newpassword: '',
      passwordconfirm: ''
    }
  }

  // componentDidMount() {
  //   fetchUtil('api/login', { name: '12', mobile: '1221' }).then(v => console.log('login', v))
  // }

  onSubmit = (e:any) => {

  }

  render() {
    const { phone, verificationCode, newpassword, passwordconfirm } = this.state
    return (
      <div className='forgetpassword'>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <label
            className='name'
          >
            <div className='symbol'>
              *
              <span className='labelName'>
                手机号:
              </span>
            </div>
            <input
              type="text"
              value={phone}
              onChange={(e) => this.setState({phone:e.target.value})}
            />
          </label>
          <label
            className='mail'
          >
            <div className='symbol'>
              *
              <span className='labelName'>
                验证码:
              </span>
            </div>
            <input type="text" value={verificationCode} onChange={(e) => this.setState({verificationCode: e.target.value})} />
          </label>
          <label
            className='phone'
          >
            <div className='symbol'>
              *
              <span className='labelName'>
                新密码:
              </span>
            </div>
            <input 
              type="text" 
              value={newpassword} 
              onChange={(e) => this.setState({newpassword: e.target.value})} 
              placeholder='（密码为6-16个字符，由大小写或数字组成）'
            />
          </label>
          <label
            className='verificationCode'
          >
            <div className='symbol'>
              *
              <span className='labelName'>
                确认新密码:
              </span>
            </div>
            <input
              type="text"
              value={passwordconfirm}
              onChange={(e) => this.setState({passwordconfirm: e.target.value})}
            />
            <span className='vCode'>获取验证码</span>
          </label>
          <input className='submit' type="submit" value="提交" />
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Forgetpassword)
