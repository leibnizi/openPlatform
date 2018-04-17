import * as React from "react";
import './statusCard.less'
import { Button } from "antd/lib/radio";

// interface NavProps {
//   routes: RouteType[];
// }

export const StatusCard = (props: any) => {

  // const navs = createNavigations(props.routes)

  return (
    // <nav className="navigation">
    <div className="card-box">
      <img src="" alt=""/>
      <div className="btn-box">
        <Button>编辑</Button>
        <Button>删除</Button>
      </div>
    </div>
    // </nav>
  )
}
