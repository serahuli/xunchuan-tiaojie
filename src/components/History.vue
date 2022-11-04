<template>
  <div class="history-wrap">
    <div ref="historyChartContainer" class="area-charts">
      <div ref="historyChart" id="historyChart" style="height: 300px"></div>
    </div>
    <div class="circles">
      <div class="circle-data">
        <CircleProgress  
          :id="1"
          :radius="20"
          :progress="75"
          :isAnimation="true"
          :gradientsColor='[ { offset: "0%", color: "#60cbb9" },{ offset: "100%", color: "#614ef6" } ]'
        >
          <div class="show-title">昨日新增</div>
          <div class="show-num">6</div>
        </CircleProgress>
      </div>
      <div class="circle-data">
        <CircleProgress  
          :id="2"
          :radius="20"
          :progress="75"
          :isAnimation="true"
          :gradientsColor='[ { offset: "0%", color: "#60cbb9" },{ offset: "100%", color: "#614ef6" } ]'
        >
          <div class="show-title">7日新增</div>
          <div class="show-num">26</div>
        </CircleProgress>
      </div>
    </div>
  </div>
</template>

<script>
import CircleProgress  from 'vue-circleprogressbar';
import { getHistoryByDate } from '../apis/index'
import { designWidth } from '../styles/utils.scss'
export default {
  name: 'History',
  data() {
    return {
      history: undefined,
      historyXData: [],
      historyYData: []
    }
  },
  components: { CircleProgress },
  mounted() {
    this.initHistoryByDate();
  },
  methods: {
    initHistoryByDate() {
      getHistoryByDate()
      .then((res) => {
        this.history = res
        this.historyXData = Object.keys(res)
        this.historyYData = Object.values(res)

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
            }
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
  position: relative;
  .area-charts {
    width: 100%;
    height: vh(628);
    margin-top: vh(61);
  }

  .circles {
    position: absolute;
    top: vh(-101);
    right: vw(50);

    display: flex;

    .circle-data {
      width: vw(200);
      height: vw(200);
      &:first-child {
        margin-right: vw(20);
      }

      .show-title {
        width: vw(200);
        text-align: center;
        position: absolute;
        top: vh(35);
        font-size: vw(30);
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #156ED0;
      }

      .show-num {
        width: vw(200);
        text-align: center;
        position: absolute;
        top: vh(65);
        font-size: vw(48);
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFF;
      }
    }
  }
  
}
</style>