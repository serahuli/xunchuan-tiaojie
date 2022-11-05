<template>
  <div class="map-container" ref="mapBg">
    <div ref="mapChart" id="mapChart"></div>
  </div>
</template>

<script>

import { designWidth } from '../styles/utils.scss'
import { mapData } from '@/utils'
export default {
  name: 'ConflictTypes',
  data() {
    return {
      conflictTypes: [],
      currentMap: '临沧市'
    }
  },
  mounted() {
    this.initMapChart()
  },
  methods: {
    initMapChart() {
      this.$nextTick(() => {
        const { path, query } = this.$route
        const currentMapInfo = mapData[query.countryName ? query.countryName : '临沧市']
        let myChart = this.echarts.init(this.$refs.mapChart)
        this.echarts.registerMap(currentMapInfo.name, currentMapInfo.map);
        let chartMap = this.$refs.mapBg
        const height = chartMap.clientHeight
        const width = chartMap.clientWidth
        myChart.getDom().style.height = `${height}px`;
        myChart.getDom().style.width = `${width}px`;
        // myChart.resize()

        // 绘制图表
        myChart.setOption({
          series: [this.getParams(currentMapInfo)],
        });

        myChart.on('click', params => {
          if(mapData[params.name]) {
            if(params.name === '临沧市') {
              this.$router.push({ path: "/" });
            } else {
              this.$router.push({
                path: "/country",
                query: { countryName: params.name },
              });
            }
          }
        });
      })
    },

    getParams(currentMapInfo) {
      let series = {
        type: 'map',
        map: currentMapInfo.name,
        label: {
          show: true,
          position: 'inside',
          color: '#2deaec',
          fontWeight: 400,
          fontSize: (100 / designWidth) * document.body.clientWidth,
          fontFamily: 'YouSheBiaoTiHei'
        },
        itemStyle: {
          areaColor: 'rgba(45, 234, 236,0.2)',
          borderColor: '#2deaFD',
          borderWidth: (8 / designWidth) * document.body.clientWidth,
        },
        silent: false,
        emphasis: {
          itemStyle: {
            areaColor: 'rgba(45, 234, 236,0.6)',
            borderColor: '#2deaFD',
            borderWidth: (15 / designWidth) * document.body.clientWidth,
          },
          label: { color: '#2deaeD' }
        },
        select: { disabled: true },
        roam: false,//不开启缩放和平移
        zoom: 1.2,//视角缩放比例
        aspectScale: 1, // 宽高比, 对应背景图
        universalTransition: { enabled: false },
      }

      switch(currentMapInfo.name) {
        case '临沧市':
          series.aspectScale = 1 // 宽高比, 对应背景图
          series.top = '20%' 
          delete series.left
          break;
        case '永德县':
          series.aspectScale = 0.9 // 宽高比, 对应背景图
          series.top = '30%'
          series.left = '10%'
          break;
        case '凤庆县':
          series.aspectScale = 0.9 // 宽高比, 对应背景图
          series.top = '10%'
          series.left = '10%'
          break;
        case '云县':
          series.aspectScale = 0.9 // 宽高比, 对应背景图
          series.top = '10%'
          series.left = '10%'
          break;
        case '镇康县':
          series.aspectScale = 1 // 宽高比, 对应背景图
          series.top = '20%'
          series.left = '10%'
          break;
        case '耿马县':
          series.aspectScale = 0.6 // 宽高比, 对应背景图
          series.top = '20%'
          series.left = '10%'
          break;
        case '临翔区':
          series.aspectScale = 1.2 // 宽高比, 对应背景图
          series.top = '20%'
          series.left = '10%'
          break;
        case '双江县':
          series.aspectScale = 1.2 // 宽高比, 对应背景图
          series.top = '20%'
          series.left = '10%'
          break;
        case '沧源县':
          series.aspectScale = 0.9 // 宽高比, 对应背景图
          series.top = '40%'
          series.left = '10%'
          break;
      }
      return series
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/utils.scss';
@import '../styles/font.css';
.map-container {
  height: 100%;
  width: 100%;
  padding-left: vw(16);
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

  button {
    position: absolute;
    z-index: 99;
  }
}
</style>