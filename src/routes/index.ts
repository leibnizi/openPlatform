import { homeRoute } from './home'
import { bussinessRoute } from './business'
import { finacialRoute } from './finacial'
import { helpMessageRoute } from './helpMessage'
import { splashRoute } from './splash'
import { operation } from './operation'
import { RouteType } from '../types/RouteConfigType';

export const a = [
  ...splashRoute
]

export const routes: Array<RouteType> = [
  homeRoute, operation, bussinessRoute, finacialRoute, helpMessageRoute
]
