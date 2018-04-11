import * as React from 'react';
import { NumblockProps } from '../../../types/home';
// import { Row, Col } from 'antd'

const NumBlock = ({ title, value = 0, children }:NumblockProps) => {
  return (
    <div className="box">
      <div className="title">{title}</div>
      <div className="vauel">{value}</div>
      <div>{children}</div>
    </div>
  )

  // return <i className={classnames('antdadmin', [`icon-${type}`], className)} />
}

export default NumBlock
