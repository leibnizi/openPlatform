import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

function lineChart(options: ChartOptions | any) {
  const { id, datas, viewport, title  } = options;

  let chart = echarts.init(document.getElementById(id) as HTMLDivElement);
  let chartOptions: any = {};
  chartOptions.series = datas.map((dRow:any) => {
    return {
      name: dRow.name,
      data: dRow.data,
      type: 'line',
      smooth: options.smooth ? options.smooth : false
    }
  });
  chartOptions.yAxis = options.yAxis ? options.yAxis : [{ type: 'value' }];
  chartOptions.xAxis = [{
    type: 'category',
    data: viewport
  }];

  if (options.tooltip) { chartOptions.tooltip = { show: true, trigger: 'item' }; }

  if (options.title) { chartOptions.title = options.title; }

  if (options.legend) {
    chartOptions.legend = {
      show: options.legend,
      data: datas.map((dRow:any) => {
        return dRow.name
      })
    }
  }
  if(chartOptions.title){
    chartOptions.title = {
      text: title
    }
  }

  chart.setOption(chartOptions);
}

export default lineChart
