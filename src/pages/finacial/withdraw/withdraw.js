import React, { Component } from 'react';
import {fetchUtil} from '../../../services/httpRequest'

export default class Withdraw extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    fetch('/api/financial/get_list').then(Withdraw=>console.log('Withdraw',Withdraw))
  }

  render() {

    return (
      <div>
        <p>提现明细</p>
      </div>
    )
  }
};
