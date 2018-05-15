import * as React from 'react'
import './register.less'

export default class RegisterSuccess extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {

    return (
      <section className='registerOut'>
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
      </section>
    )
  }
}