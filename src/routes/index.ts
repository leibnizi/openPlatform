import { homeRoute } from './home'
import { bussinessRoute } from './business'
import { finacialRoute } from './finacial'
import { helpMessageRoute } from './helpMessage'
import { operation } from './operation'
import { registerRoute } from './register'
import { loginRoute } from './login'
import { splashRoute } from './splash'
import { RouteType } from '../types/RouteConfigType'

export const routes: Array<RouteType> = [
  homeRoute, 
  operation, 
  bussinessRoute, 
  finacialRoute, 
  helpMessageRoute,
  loginRoute,
  splashRoute
]

export const registerPage: Array<RouteType> = [
  registerRoute, 
]