import { homeRoute } from './home'
import { businessRoute } from './business'
import { finacialRoute } from './finacial'
import { helpMessageRoute } from './helpMessage'
import { operationRoute } from './operation'
import { splashRoute } from './splash'

export default [
  ...homeRoute,
  ...operationRoute,
  ...businessRoute,
  ...helpMessageRoute,
  ...finacialRoute,
  ...splashRoute
]
