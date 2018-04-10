import React, { Component } from 'react';
import {fetchUtil} from '../../../services/httpRequest'

export default class Detail extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    fetch('/api/financial/get_list').then(Detail=>console.log('Detail',Detail))
  }

  render() {

    return (
      <div>
        <p>对账明细</p>
      </div>
    )
  }
};
