// ! 按需引入 ECharts
// https://echarts.apache.org/zh/tutorial.html#%E5%9C%A8%E6%89%93%E5%8C%85%E7%8E%AF%E5%A2%83%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts

import * as echarts from 'echarts/core';
import {
  LineChart,
  LineSeriesOption,
  PieChart,
  PieSeriesOption,
} from 'echarts/charts';
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  LineSeriesOption | PieSeriesOption | TitleComponentOption | TooltipComponentOption | GridComponentOption
>;

// 注册必须的组件
echarts.use(
  [LineChart, PieChart, TitleComponent, TooltipComponent, GridComponent, CanvasRenderer]
);

export default echarts
