import * as React from 'react'
// import { Button } from 'antd'
import './splash.less'
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

  // componentDidMount() {
  //   fetchUtil('api/login', { name: '12', mobile: '1221' }).then(v => console.log('login', v))
  // }

  // handleChangeId = (e: string) => {
  //   this.setState({ id: e })
  // }

  // handleChangePass = (e: string) => {
  //   this.setState({ password: e })
  // }

  // handleSubmit = (e: any) => {
  //   e.preventDefault()
  //   const { id, password } = this.state
  //   fetchUtil('api/login', { name: String(id), mobile: String(password) })
  //     .then(v => console.log('login', v))
  // }

  // handleOk = () => {
  //   const { id, password } = this.state
  //   fetchUtil('api/login', { name: String(id), mobile: String(password) })
  //     .then(v => console.log('login', v))
  // }

  // modaloff = () => {
  //   this.setState({ modalshow: false })
  // }

  // modalon = () => {
  //   this.setState({ modalshow: true })
  // }

  render() {
    // const { modalshow, loading, id, password } = this.state
    return (
      <div className='splash'>
        <p className='name splashchild'>商家后台管理系统</p>
        <p
          className='login splashchild'
          // onClick={() => this.modalon()}
        >
          登录
        </p>
        <p className='register splashchild'>申请加入女神派</p>
        {/* <Modal
          visible={modalshow}
          title=""
          
          onOk={() => this.modaloff()}
          onCancel={() => this.setState({ modalshow: false })}
          footer={[
            <Button 
              className='loginButton' 
              key="submit" 
              type="primary" 
              loading={loading} 
              onClick={() => this.handleOk()}
            >
              登录
            </Button>,
          ]}
        >
          <label>
            账户:
            <input type="text" value={id} onChange={(e) => this.handleChangeId(e.target.value)} />
          </label>
          <label>
            密码:
          <input type="text" value={password} onChange={(e) => this.handleChangePass(e.target.value)} />
          </label>
        </Modal> */}
      </div>
    )
  }
};
