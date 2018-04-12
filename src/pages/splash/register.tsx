import * as React from 'react'
import './register.less'

// import { fetchUtil } from '../../services/httpRequest'

export default class Register extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      tabIndex: 0,
      name: '',
      mail: '',
      phone: '',
      verificationCode: '',
      password: '',
      confirmPassword: ''
    }
  }

  // componentDidMount() {
  //   fetchUtil('api/login', { name: '12', mobile: '1221' }).then(v => console.log('login', v))
  // }

  gotoStep = (e:any, tabIndex: number) => {
    e.preventDefault()
    this.setState({tabIndex})
  }

  handleChangName = (name:string) => {
    this.setState({name})
  }

  handleChangMail = (mail: string) => {
    this.setState({mail})
  }

  handleChangPhone = (phone: string) => {
    this.setState({phone})
  }

  handleChangCode = (verificationCode:string) => {
    this.setState({verificationCode})
  }

  handleChangPass = (password: string) => {
    this.setState({password})
  }

  handleChangConfirm = (confirmPassword:string) => {
    this.setState({confirmPassword})
  }

  render() {
    const { tabIndex, name, mail, phone, verificationCode, password, confirmPassword } = this.state
    return (
      <div className='registerOut'>
        {
          tabIndex === 2 ? (
            <div className='register'>
              <section className='registerSuccess'>
                <img src={require('../../styles/img/registerend.png')} />
                <div>
                  <p className='p1'>提交成功!</p>
                  <p className='p2'>审核时间需要5-20个工作日</p>
                  <p className='p2'>如有疑问,可联系客服</p>
                </div>

              </section>
            </div>
          ) : (
            <div className='register'>
              <header>
                  <span
                    className={tabIndex===0?'registerActive':'registernormal'}
                  >
                    创建账户
                  </span>
                <span
                  className={tabIndex===1?'registerActive':'registernormal'}
                >
                  填写商家信息
                </span>
              </header>
              <hr/>
              {
                tabIndex === 0 ? (
                  <form onSubmit={(e) => this.gotoStep(e, 1)}>
                    <label
                      className='name'
                    >
                      用户名
                      <input type="text" value={name} onChange={(e) => this.handleChangName(e.target.value)} />
                    </label>
                    <label
                      className='mail'
                    >
                      邮箱
                      <input type="text" value={mail} onChange={(e) => this.handleChangMail(e.target.value)} />
                    </label>
                    <label
                      className='phone'
                    >
                      手机号
                      <input type="text" value={phone} onChange={(e) => this.handleChangPhone(e.target.value)} />
                    </label>
                    <label
                      className='verificationCode'
                    >
                      验证码
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => this.handleChangCode(e.target.value)}
                      />
                    </label>
                    <label
                      className='password'
                    >
                      密码
                      <input type="text" value={password} onChange={(e) => this.handleChangPass(e.target.value)} />
                    </label>
                    <label
                      className='confirmPassword'
                    >
                      确认密码
                      <input
                        type="text"
                        value={confirmPassword}
                        onChange={(e) => this.handleChangConfirm(e.target.value)}
                      />
                    </label>
                    <input className='submit' type="submit" value="登录" />
                  </form>
                ) : tabIndex === 1 ? (
                  <form onSubmit={(e) => this.gotoStep(e, 2)}>
                    <label
                      className='name'
                    >
                      企业名称
                      <input type="text" value={name} onChange={(e) => this.handleChangName(e.target.value)} />
                    </label>
                    <label
                      className='mail'
                    >
                      上年度营业额量级
                      <input type="text" value={mail} onChange={(e) => this.handleChangMail(e.target.value)} />
                    </label>
                    <label
                      className='phone'
                    >
                      主营品牌
                      <input type="text" value={phone} onChange={(e) => this.handleChangPhone(e.target.value)} />
                    </label>
                    <label
                      className='verificationCode'
                    >
                      官网地址
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => this.handleChangCode(e.target.value)}
                      />
                    </label>
                    <label
                      className='password'
                    >
                      主营类目
                      <input type="text" value={password} onChange={(e) => this.handleChangPass(e.target.value)} />
                    </label>
                    <label
                      className='confirmPassword'
                    >
                      商家类型
                      <input
                        type="text"
                        value={confirmPassword}
                        onChange={(e) => this.handleChangConfirm(e.target.value)}
                      />
                    </label>
                    <label
                      className='password'
                    >
                      运营人员
                      <input type="text" value={password} onChange={(e) => this.handleChangPass(e.target.value)} />
                    </label>
                    <label
                      className='password'
                    >
                      联系电话
                      <input type="text" value={password} onChange={(e) => this.handleChangPass(e.target.value)} />
                    </label>
                    <label
                      className='password'
                    >
                      邮箱
                      <input type="text" value={password} onChange={(e) => this.handleChangPass(e.target.value)} />
                    </label>
                    <label
                      className='password'
                    >
                      QQ
                      <input type="text" value={password} onChange={(e) => this.handleChangPass(e.target.value)} />
                    </label>
                    <label
                      className='password'
                    >
                      传真
                      <input type="text" value={password} onChange={(e) => this.handleChangPass(e.target.value)} />
                    </label>
                    <label
                      className='password'
                    >
                      公司地址
                      <input type="text" value={password} onChange={(e) => this.handleChangPass(e.target.value)} />
                    </label>
                    <label
                      className='password'
                    >
                      营业执照
                      <input type="text" value={password} onChange={(e) => this.handleChangPass(e.target.value)} />
                    </label>
                    <label
                      className='password'
                    >
                      补充资质
                      <input type="text" value={password} onChange={(e) => this.handleChangPass(e.target.value)} />
                    </label>
                    <button className='submit' onClick={(e)=>this.gotoStep(e, 0)}>上一步</button>
                    <input className='submit' type="submit" value="下一步" />
                  </form>
                ) : (
                  null
                )
              }
            </div>
          )
        }

        {/* <form onSubmit={(e) => this.loginin(e)}>
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
        </form> */}
      </div>
    )
  }
};
