import * as React from 'react'
import './splash.less'
import { fetchUtil } from '../../services/httpRequest'

export default class Login extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      // id: '',
      // password: '',
      // modalshow: false,
      // loading: false
    }
  }

  // componentDidMount() {
  //   fetchUtil('api/login', { name: '12', mobile: '1221' }).then(v => console.log('login', v))
  // }

  loginin = () => {
    fetchUtil('api/login', { name: '12', mobile: '1221' }).then(v => console.log('login', v))
  }

  render() {
    // const { modalshow, loading, id, password } = this.state
    return (
      <div className='splash'>
        <p className='name splashchild'>账户：</p>
        <p
          className='login splashchild'
          onClick={() => this.loginin()}
        >
          密码：
        </p>
        <p className='register splashchild'>申请加入女神派</p>
      </div>
    )
  }
};
