import * as React from 'react'
import { Button } from 'antd'
// import {fetchUtil} from '../../../services/httpRequest'

export default class Detail extends React.Component <any,any> {

  constructor(props: any) {
    super(props)

    this.state = {
      formNum: ''
    }
  }

  // hasErrors = (fieldsError: any) => Object.keys(fieldsError).some(field => fieldsError[field])

  componentDidMount() {
    // fetch('/api/financial/info_list').then(Detail=>console.log('Detail',Detail))
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
    // fetch('/api/financial/info_list', {begin:}).then(Detail=>console.log('Detail',Detail))
    console.group("label",this.state.formNum)
    
  }

  handleChange = (e: string) => {
    this.setState({formNum: e})
  }

  render() {

    return (
      <div>
        <p>对账明细</p>
        <p>账单时间：</p>
        <p>账单编号：<input/></p>
        <Button>查询</Button>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.formNum} onChange={(e)=>this.handleChange(e.target.value)}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
