import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Customerservice from '../pages/helpMessage'
import Message from '../pages/helpMessage/message/message'
import Announcement from '../pages/helpMessage/announcement/announcement'

export default class HelpMessage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <div>
          <div className='aside'>
            <p>帮助中心</p>
            <OldMenuLink activeOnlyWhenExact={true} to="/help" label="帮助&客服" />
            <p>信息中心</p>
            <OldMenuLink to="/help/message" label="系统信息" />
            <OldMenuLink to="/help/announcement" label="商家公告" />
          </div>
          <div className='content'>
            <Route exact path="/help" component={Customerservice} />
            <Route path="/help/message" component={Message} />
            <Route path="/help/announcement" component={Announcement} />
          </div>
        </div>
      </Router>
    )
  }
}

const OldMenuLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <div className={match ? "active" : "normal"}>
        <Link to={to}>{label}</Link>
      </div>
    )}
  />
)
