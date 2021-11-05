// 1、引入依赖脚本
import * as echarts from '../../ec-canvas/echarts';

let chart = null;
let app = getApp();
// 2、进行初始化数据
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

    // 指定图表的配置项和数据
    var option = {
      dataZoom: [
        {
            show: false,
            realtime: true,
            start: 0,
            end: 50
        },
        {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 50
        }
      ],
      xAxis: { //x坐标
          type: 'category',
          data: app.globalData.time24
      },
      yAxis: {//y坐标
          type: 'value',
          axisLabel: {
            formatter: '{value} °C'
          }
      },
      series: [{
          data: app.globalData.tmp24time,
          type: 'line',
          markPoint: {
              data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
              ]
          },
          markLine: {
              data: [
                  {type: 'average', name: '平均值'}
              ]
          }
      }]
    };
  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart // 3、将数据放入到里面
    }
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  }
});

