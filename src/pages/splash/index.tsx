import * as React from 'react'
import { Link } from 'react-router-dom'
// import { Button } from 'antd'
import './index.less'
// import { fetchUtil } from '../../services/httpRequest'

export default class Splash extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      // id: '',
      // password: '',
      // modalshow: false,
      // loading: false
    }
  }

  render() {
    // const { modalshow, loading, id, password } = this.state
    return (
      <div className='splash'>
        <p className='name splashchild'>商家后台管理系统</p>
        <div className='splashmid'>
          <Link
            to='/login'
            className='login'
          >
            登录
          </Link>
          <Link
            to='/register'
            className='register'
          >
            申请加入女神派
          </Link>
        </div>

      </div>
    )
  }
};
