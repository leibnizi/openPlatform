import { ReactElement } from "react";

interface RouteItem{
  path:string;
  title:string;
  component:any;
  exact?:boolean
}

interface SiderItem extends RouteItem{

}

interface SiderType{
  block:string;
  items:SiderItem[];
}

interface RouteType extends RouteItem{
  sider:SiderType[];
  firstPage?:string;
}
