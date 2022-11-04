<template>
  <div class="conflict-types-infos" ref="conflictTypeChartContainer">
    <div ref="conflictTypeChart" id="conflictTypeChart" style="height: 300px"></div>
  </div>
</template>

<script>
import { getConflictTypes } from '../apis/index'
import { designWidth } from '../styles/utils.scss'
export default {
  name: 'ConflictTypes',
  data() {
    return {
      conflictTypes: []
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      getConflictTypes()
      .then((res) => {
        this.conflictTypes = res

        this.initconflictTypeChart()
      })
    },
    initconflictTypeChart() {
      this.$nextTick(() => {
        let myChart = this.echarts.init(this.$refs.conflictTypeChart)
        let myChartContainer = this.$refs.conflictTypeChartContainer.clientHeight;

        myChart.getDom().style.height = `${myChartContainer}px`;
        myChart.resize()
        // 绘制图表
        myChart.setOption({
          color: ['#A38A78', '#E3D253', '#920683', '#8084E9','#F7A25C', '#8FEC7C', '#FF6A6A', '#FF6A6A',],
          series: [
            {
              type: 'pie',
              radius: ['30%', '65%'],
              center: ['50%', '50%'],
              roseType: 'area',
              label: {
                position: 'outside',
                color: '#BDE3F8',
                fontSize: (30 / designWidth) * document.body.clientWidth,
                overflow: 'truncate',
                formatter: '{b}\n{d}%',
              },
              labelLine: {
                lineStyle: {
                  color: '#BDE3F8'
                }
              }
            }
          ],
          dataset: {
            dimensions: ['typeName', 'count'],
            source: this.conflictTypes
          }
        });
      })
    },
  }
}
</script>

<style scoped lang="scss">
@import '../styles/utils.scss';

.conflict-types-infos {
  height: vh(580);
}
</style>