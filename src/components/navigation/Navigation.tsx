import * as React from "react";
import { NavLink } from "react-router-dom";
import { RouteType } from "../../types/RouteConfigType";
import './nav.less'

function createNavigations(routes: RouteType[]): JSX.Element[] {

  const navItems = routes.map((routeItem: RouteType, rIndex: number) => {
    const landingPageUrl = routeItem.firstPage ? `${routeItem.path}/${routeItem.firstPage}` : routeItem.path
    return (
      <div key={rIndex}>
        <NavLink
          exact={true}
          key={`${routeItem.path}-${rIndex}`}
          to={landingPageUrl}
          activeClassName={'active'}
        >
          {routeItem.title}
        </NavLink>
      </div>
    )
  })

  return navItems;
}

interface NavProps {
  routes: RouteType[];
}

export const Navigation = (props: NavProps) => {

  const navs = createNavigations(props.routes)

  return (
    // <nav className="navigation">
    <nav className="navigation">
      {navs}
    </nav>
    // </nav>
  )
}
