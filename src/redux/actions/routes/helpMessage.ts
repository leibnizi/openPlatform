import { RouteType } from "../types/RouteConfigType";

export const helpMessageRoute: RouteType = {
  title: '帮助&消息',
  path: '/helpMessage',
  component: null,
  firstPage:"custom",
  sider: [
    {
      block: "帮助中心",
      items: [
        {
          title: "帮助&客服",
          path: "custom",
          component: null
        }
      ]
    },
    {
      block: "信息中心",
      items: [
        {
          title: "系统信息",
          path: "system",
          component: null
        },
        {
          title: "商家公告",
          path: "announce",
          component: null
        }
      ]
    }
  ]
}
