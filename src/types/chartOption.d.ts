interface ChartOptions{
  id:string;
  datas:Array<{name:string,data:Array<any>}>;
  viewport:Array<any>;
  series:Array<any>;
  title?:any;
  yAxis?:any;
  tooltip?:any;
  legend?:any;
  smooth?:boolean;
}
