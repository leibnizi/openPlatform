import Home from '../pages/home';
import { RouteType } from '../types/RouteConfigType';

export const homeRoute: RouteType = {
  path: '/',
  title: '首页',
  component: Home,
  sider: [],
  exact: true
}
