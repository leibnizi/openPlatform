import { RouteType } from "../types/RouteConfigType";

export const finacialRoute: RouteType = {
  title: '财务管理',
  path: '/finacial',
  component: null,
  firstPage:"overview",
  sider: [
    {
      block: "财务管理",
      items: [
        {
          title: "财务总览",
          path: "overview",
          component: null
        },
        {
          title: "提现管理",
          path: "withdraw",
          component: null
        }
      ]
    },
    {
      block: "对账管理",
      items: [
        {
          title: "对账明细",
          path: "detail",
          component: null
        }
      ]
    }
  ]
}
