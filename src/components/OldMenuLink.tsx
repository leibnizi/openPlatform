import * as React from "react";
import { Route, Link } from "react-router-dom";
// import { OldMenuType } from "../types/oldMenuType.d";

export const OldMenuLink = ({ label, to, activeOnlyWhenExact }:OldMenuType) => (
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
