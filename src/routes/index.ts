import Home from '../pages/home'
import Product from '../pages/operation'
import Business from '../pages/business'
import Finacial from '../pages/finacial'
import HelpMessage from '../pages/helpMessage'

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
    component: Finacial
  },
  {
    label:'帮助&消息',
    path:'/helpMessage',
    component: HelpMessage
  },
]
