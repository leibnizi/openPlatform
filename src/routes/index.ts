import { homeRoute } from './home'
import { businessRoute } from './business'
import { finacialRoute } from './finacial'
import { helpMessageRoute } from './helpMessage'
import { splashRoute } from './splash'
import Home from '../pages/home/index';
import {operation} from './operation'
import { RouteType } from '../types/RouteConfigType';

export const a = [
  ...homeRoute,
  ...businessRoute,
  ...helpMessageRoute,
  ...finacialRoute,
  ...splashRoute
]

const home: RouteType = {
  path: '/',
  title: '首页',
  component: Home,
  sider: [],
  exact:true
}

export const routes: Array<RouteType> = [
  home, operation
]
