<template>
  <div class="map-container">
    <img class="map-bg" ref="mapBg" src="../assets/images/home/map4.png" alt="">
    <div ref="mapChart" id="mapChart"></div>
  </div>
</template>

<script>

import { designWidth } from '../styles/utils.scss'
import lincangGEO from '../assets/jsons/lincang.json'
export default {
  name: 'ConflictTypes',
  data() {
    return {
      conflictTypes: []
    }
  },
  mounted() {
    this.initMapChart()
  },
  methods: {
    initMapChart() {
      this.$nextTick(() => {
        let myChart = this.echarts.init(this.$refs.mapChart)
        this.echarts.registerMap('LC', lincangGEO);
        let chartMap = this.$refs.mapBg
        const height = chartMap.clientHeight
        const width = chartMap.clientWidth
        myChart.getDom().style.height = `${height}px`;
        myChart.getDom().style.width = `${width}px`;
        myChart.resize()

        // 绘制图表
        myChart.setOption({
          series: [
            {
              type: 'map',
              map: 'LC',
              label: {
                show: true,
                position: 'inside',
                color: '#2deaec',
                fontWeight: 400,
                fontSize: (100 / designWidth) * document.body.clientWidth,
                fontFamily: 'YouSheBiaoTiHei'
              },
              itemStyle: {
                areaColor: 'transparent',
                borderColor: '#2deaFD',
                borderWidth: (8 / designWidth) * document.body.clientWidth,
              },
              silent: false,
              emphasis: {
                itemStyle: {
                  areaColor: 'rgba(45, 234, 236,0.4)',
                  borderColor: '#2deaFD',
                  borderWidth: (15 / designWidth) * document.body.clientWidth,
                },
                label: {
                  color: '#2deaeD',
                }
              },
              select: {
                disabled: true,
              },
              roam: false,//不开启缩放和平移
              zoom: 1.2,//视角缩放比例
              aspectScale: (width * 1.01) / height, // 宽高比, 对应背景图
              universalTransition: {
                enabled: false
              },
            }
          ],
        });
      })
    },
  }
}
</script>

<style scoped lang="scss">
@import '../styles/utils.scss';
@import '../styles/font.css';
.map-container {
  height: 100%;
  width: 100%;
  position: relative;

  .map-bg {
    position: absolute;
    z-index: -1;
    top: vh(20);
    left: vw(30);
    width: 100%;
    height: 100%;
    transform: scale(1);
  }

  #mapChart {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>