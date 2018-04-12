import Products from '../pages/operation/productlist/product';
import Lease from "../pages/operation/lease";
import Sale from "../pages/operation/sale";
import AfterSale from '../pages/operation/afterSale';
import { RouteType } from "../types/RouteConfigType";

export const operation: RouteType = {
  path: '/operation',
  title: "运营管理",
  component: Products,
  firstPage:"productList",
  sider: [
    {
      block: "商品管理",
      items: [
        {
          path: "productList",
          title: "商品列表",
          component: Products
        }
      ]
    },
    {
      block: "订单管理",
      items: [
        {
          path: "lease",
          title: "租赁订单",
          component: Lease
        },
        {
          path: "sale",
          title: "销售订单",
          component: Sale
        }
      ]
    },
    {
      block: "售后管理",
      items: [
        {
          path: "afterSale",
          title: "售后订单",
          component: AfterSale
        }
      ]
    }
  ]
}
