import * as React from "react";
import { NavLink } from 'react-router-dom'
import { SiderType } from "../../types/RouteConfigType";
import './leftMenu.less';

interface LeftMenuProp {
  sider: SiderType[] | null;
  basePath: string;
}

function createLeftMenu(sider: SiderType[] | null, basePath: string): JSX.Element[] {
  if (sider === null) { return []; }
  const leftMenus = sider.map((sItem, sIndex) => {
    return (
      <div key={sItem.block + sIndex}>
        <h3>{sItem.block}</h3>
        <div>
          {sItem.items.map((rItem, rIndex) => {
            return <NavLink key={rIndex + rItem.path} to={`${basePath}/${rItem.path}`}>{rItem.title}</NavLink>
          })
          }
        </div>
      </div>)
  })

  return leftMenus;
}

export const LeftMenu = (props: LeftMenuProp) => {
  console.log("MenuProps", props)

  const menus = createLeftMenu(props.sider, props.basePath)

  return (
    <section>
      {
        menus
      }
    </section>
  )
}
