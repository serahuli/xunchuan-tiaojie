<template>
  <div class="history-wrap">
    <div ref="historyChartContainer" class="area-charts">
      <div ref="historyChart" id="historyChart" style="height: 300px"></div>
    </div>
    <div class="circles">
      <svg class="circle circle1">
        <defs>
          <linearGradient x1="1" y1="0" x2="0" y2="0" id="gradient3">
            <stop offset="0%" stop-color="#b0cbb9"></stop>
            <stop offset="100%" stop-color="#614ef6"></stop>
          </linearGradient>
        </defs>
        <circle  cx="45" cy="45" r="30" fill="none" stroke-width="6" stroke="url('#gradient3')"></circle>
        <text x="45" y="45" style="font-size: 12px;" fill="rgba(21, 110, 208, 1)" text-anchor="middle">
          <tspan class="text">昨日新增</tspan>
        </text>
        <text x="45" y="65"  style="font-size: 16px;" fill="#fff" text-anchor="middle">
          <tspan class="text">{{yerDay}}</tspan>
        </text>
      </svg>
      <svg class="circle circle2">
        <defs>
          <linearGradient x1="1" y1="0" x2="0" y2="0" id="gradient3">
            <stop offset="0%" stop-color="#b0cbb9"></stop>
            <stop offset="100%" stop-color="#614ef6"></stop>
          </linearGradient>
        </defs>
        <circle  cx="45" cy="45" r="30" fill="none" stroke-width="6" stroke="url('#gradient3')"></circle>
        <text x="45" y="45" style="font-size: 12px;" fill="rgba(21, 110, 208, 1)" text-anchor="middle">
          <tspan class="text">7日新增</tspan>
        </text>
        <text x="45" y="65"  style="font-size: 16px;" fill="#fff" text-anchor="middle">
          <tspan class="text">{{sevenDay}}</tspan>
        </text>
      </svg>
    </div>
  </div>
</template>

<script>
import { getHistoryByDate } from '@/apis/index'
import { designWidth } from '../styles/utils.scss'
export default {
  name: 'History',
  data() {
    return {
      history: undefined,
      historyXData: [],
      historyYData: [],
      yerDay: 0,
      sevenDay: 0
    }
  },
  mounted() {
    this.init()
    setInterval(() => this.init(), 30 * 60 * 1000)
  },
  methods: {
    init() {
      getHistoryByDate()
      .then((res) => {
        this.history = res
        this.historyXData = Object.keys(res)
        this.historyYData = Object.values(res)
        this.yerDay = Object.values(res)[0]
        let sum = 0;
        for(let i = 0; i < Object.values(res).length; i++) {
          sum+=Object.values(res)[i]
        }
        this.sevenDay = sum
        this.initHistoryChart()
      })
    },
    initHistoryChart() {
      this.$nextTick(() => {
        let myChart = this.echarts.init(this.$refs.historyChart)
        let myChartContainer = this.$refs.historyChartContainer.clientHeight;

        myChart.getDom().style.height = `${myChartContainer}px`;
        myChart.resize()
        // 绘制图表
        myChart.setOption({
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.historyXData,
            axisLabel: {
              color: '#fff',
              fontSize: (36 / designWidth) * document.body.clientWidth,
              align: 'right'
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              color: '#fff',
              fontSize: (36 / designWidth) * document.body.clientWidth,
              verticalAlign: 'bottom'
            },
            splitLine: {
              show: false
            },
            max: 50
          },
          series: [
            {
              data: this.historyYData,
              type: 'line',
              smooth: 0.5,
              areaStyle: {},
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'rgba(46, 223, 228, 1)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgba(46, 223, 228, .4)' // 100% 处的颜色
                }],
                global: false
              },
            }
          ],
          grid: {
            show: false,
            top: 0,
            bottom: 40,
            left: 30,
            right: 0
          }
        });
      })
    },
  }
}
</script>

<style scoped lang="scss">
@import '../styles/utils.scss';
@import '../styles/font.css';

.history-wrap {
  .area-charts {
    width: 100%;
    height: vh(628);
    margin-top: vh(61);
  }

  .circles {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;

    .circle1 {
      top: 4px;
      left: 140px;
    }

    .circle2 {
      top: 4px;
      left: 240px;
    }

    .circle {
      position: absolute;
      
      fill: none;
      
      stroke-width: 8;
      stroke-dasharray: 314;
      stroke-dashoffset:0;
      animation: circle 3s infinite;
      stroke: linear-gradient(red, blue);
      text-align: center;

    }
  }
  
}
</style>