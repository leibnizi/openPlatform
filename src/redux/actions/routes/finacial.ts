import { RouteType } from "../types/RouteConfigType"
import Overview from '../pages/finacial/overview/overview'
import Withdraw from '../pages/finacial/withdraw/withdraw'
import Detail from '../pages/finacial/detail/detail'

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
          component: Overview
        },
        {
          title: "提现管理",
          path: "withdraw",
          component: Withdraw
        }
      ]
    },
    {
      block: "对账管理",
      items: [
        {
          title: "对账明细",
          path: "detail",
          component: Detail
        }
      ]
    }
  ]
}
