import * as React from 'react'
import {httpGet} from '../../../services/httpRequest'

export default class Detail extends React.Component <any,{}>  {

  constructor(props:any) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    httpGet('/api/financial/get_list').then(dData=>console.log('Detail',dData))
  }

  render() {

    return (
      <div>
        <p>对账明细</p>
      </div>
    )
  }
};
