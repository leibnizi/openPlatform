import * as React from 'react'
import './register.less'

// import { fetchUtil } from '../../services/httpRequest'

export default class Register extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      tanIndex: 0
    }
  }

  // componentDidMount() {
  //   fetchUtil('api/login', { name: '12', mobile: '1221' }).then(v => console.log('login', v))
  // }

  render() {
    const { tanIndex } = this.state
    return (
      <div className='register'>
        <header>
          <span
            className={tanIndex===0?'registerActive':'registernormal'}
            onClick={()=>this.setState({tanIndex:0})}
          >
            创建账户
          </span>
          <span 
            className={tanIndex===1?'registerActive':'registernormal'}
            onClick={()=>this.setState({tanIndex:1})}
          >
            填写商家信息
          </span>
        </header>
        <hr/>
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
