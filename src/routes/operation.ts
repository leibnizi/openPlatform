import Operation from '../pages/operation/index';
import lease from "../pages/operation/lease";
import sale from "../pages/operation/sale";
import afterSale from '../pages/operation/afterSale';

export const operationRoute = [
  {
    label: '运营管理',
    path: '/operation/product',
    component: Operation,
  },
  {
    label: '租赁订单',
    path: '/operation/lease',
    component: lease,
  }
]

export const operationRoutes = {
  path: 'operation',
  value: "运营管理",
  subRoutes: [
    {
      group: "商品管理",
      items: [
        {
          path: 'products',
          value: '商品列表',
          component: Operation
        }
      ]
    },
    {
      group: "订单管理",
      items: [
        {
          path: "lease",
          label: "租赁订单",
          component: lease
        },
        {
          path: "sale",
          label: "销售订单",
          component: sale
        }
      ]
    },
    {
      group: "售后管理",
      items: [
        {
          path: "afterSale",
          label: "售后订单",
          component: afterSale
        }
      ]
    }
  ]
}
