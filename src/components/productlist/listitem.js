import React, {Component} from 'react'
import './listitem.less'

export default class Item extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { itemname } = this.props

    return (
      <div className='item'>
        <p>{itemname}</p>
        <input></input>
      </div>
    )
  }
}
