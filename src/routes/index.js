import Home from './home'
import Product from './operation'
import Business from './business'
import Fincial from './fincial'
import HelpMessage from './helpMessage'

export default [
  {
    label:'首页',
    path:'/',
    component: Home
  },
  {
    label:'运营管理',
    path:'/operation/product',
    component: Product
  },
  {
    label:'商家中心',
    path:'/business',
    component: Business
  },
  {
    label:'财务管理',
    path:'/fincial/overview',
    component: Fincial
  },
  {
    label:'帮助&消息',
    path:'/helpMessage',
    component: HelpMessage
  },
]
