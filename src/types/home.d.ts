import { ReactElement, ReactText } from "react";

interface HomeComponent {
  _options: Object;
  _lineOp: Object;
}

export interface HomeState{
  moduleGap:any;
  on_sale_data:any;
}

export interface NumblockProps{
  title:string;
  value:number;
  children?:ReactText[]|ReactElement<any>|string;
}
