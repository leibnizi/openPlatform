import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { OldMenuType } from '../../types/oldMenuType'

const OldMenuLink = ({ label, to, activeOnlyWhenExact }: OldMenuType) => (
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

export default class HelpMessage extends React.Component < any, {} > {
  constructor(props: any) {
    super(props)
  }

  render() {

    return (
      <Router>
        <div>
          <OldMenuLink activeOnlyWhenExact={true} to="/business/home" label="Home" />
          <OldMenuLink to="/business/about" label="About" />
          <Route exact={true} path="/business/home" component={Home} />
          <Route path="/business/about" component={About} />
        </div>
      </Router>
    )
  }
}
