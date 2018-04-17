import { RouteType } from "../types/RouteConfigType";
import Infos from '../pages/business/infos'
import StatusControl from '../pages/business/statusControl/statusControl'
import Bill from '../pages/business/bill/bill'

export const bussinessRoute: RouteType = {
  title: '商家中心',
  path: '/bussiness',
  component: null,
  firstPage:"infos",
  sider: [
    {
      block: "商家信息",
      items: [
        {
          title: "商家信息",
          path: "infos",
          component: Infos
        },
        {
          title: "资质管理",
          path: "statusControl",
          component: StatusControl
        }
      ]
    },
    {
      block: "账户管理",
      items: [
        {
          title: "账务信息",
          path: "bill",
          component: Bill
        },
        {
          title: "账户信息",
          path: "account",
          component: null
        },
        {
          title: "续约管理",
          path: "renewal",
          component: null
        }
      ]
    }
  ]
}
