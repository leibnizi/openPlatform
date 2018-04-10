import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

export default class HelpMessage extends Component {
  constructor() {
    super()
  }

  render() {

    return (
      <Router>
        <div>
          <OldMenuLink activeOnlyWhenExact={true} to="/business/home" label="Home" />
          <OldMenuLink to="/business/about" label="About" />
          <Route exact path="/business/home" component={Home} />
          <Route path="/business/about" component={About} />
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
      <div className={match ? "active" : ""}>
        {match ? "> " : ""}
        <Link to={to}>{label}</Link>
      </div>
    )}
  />
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)