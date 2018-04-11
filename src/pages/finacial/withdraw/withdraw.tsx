import * as React from 'react';
import {httpGet} from '../../../services/httpRequest'

export default class Withdraw extends React.Component <any,{} > {

  constructor(props:any) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    httpGet('/api/financial/get_list').then(data=>console.log('Withdraw',data))
  }

  render() {

    return (
      <div>
        <p>提现明细</p>
      </div>
    )
  }
};
