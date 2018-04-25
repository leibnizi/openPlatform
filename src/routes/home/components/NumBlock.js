import React from 'react'
import PropTypes from 'prop-types'
// import { Row, Col } from 'antd'
import './numBlock.less'

const NumBlock = ({ title, value = 0, children }) => {
  return (
    <div className="box">
      <div className="title">{title}</div>
      <div className="value">{value}</div>
      <div>{children}</div>
    </div>
  )

  // return <i className={classnames('antdadmin', [`icon-${type}`], className)} />
}

NumBlock.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number,
  // className: PropTypes.string,
}

export default NumBlock