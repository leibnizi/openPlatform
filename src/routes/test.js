import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Row, Col } from 'antd'
import { onIncrement, onDecrement, onIncrementIfOdd, onIncrementAsync } from '../redux/actions'
import { fetchUtil } from '../service/api'
import Page from '../components/page/page'


class Home extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    fetchUtil('/api/verification_code').then(res=>console.log('res',res))
  }

  render() {
    const {
      className, children, loading = false, inner = false,
    } = this.props
    const loadingStyle = {
      height: 'calc(100vh - 184px)',
      overflow: 'hidden',
    }
    return (
      <div>
        home{this.props.value}
        <Button onClick={()=>this.props.onIncrement()} type="primary">+</Button>
        <Button onClick={()=>this.props.onDecrement()} type="primary">-</Button>
        <Button onClick={()=>this.props.onIncrementIfOdd()} type="primary">onIncrementIfOdd</Button>
        <Button onClick={()=>this.props.onIncrementAsync()} type="primary">onIncrementAsync</Button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    value: state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onIncrement,
    onDecrement,
    onIncrementIfOdd,
    onIncrementAsync
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
