<template>
  <div class="map-container" ref="mapBg">
    <div ref="mapChart" id="mapChart"></div>
  </div>
</template>

<script>
import mqtt from "mqtt";
import { designWidth, designHeight } from '../styles/utils.scss'
import { mapData, geoCoordMap, getMediate } from '@/utils'

export default {
  name: 'Map',
  data() {
    return {
      currentMap: '临沧市',
      reals: [],
      connection: {
        host: 'jie.xctsoft.com',
        port: '1883',
        endpoint: "/mqtt",
        clean: true, // 保留会话
        connectTimeout: 4000, // 超时时间
        reconnectPeriod: 4000, // 重连时间间隔
        // 认证信息
        username: "xct",
        password: "Xct@24303",
      },
      subscription: {
        topic: '/webnowmediaterecord',
        qos: 2,
      },
      client: {
        connected: false,
      },
      subscribeSuccess: false,
      myChart: null
    }
  },
  mounted() {
    this.initMapChart()

    this.initMqtt();
  },
  watch: {
    reals: {
      handler: function(val, oldVal) {
        this.initMapChart()
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    initMapChart() {
      this.$nextTick(() => {
        const { path, query } = this.$route
        const currentMapInfo = mapData[query.countryName ? query.countryName : '临沧市']
        this.myChart = this.echarts.init(this.$refs.mapChart)
        this.echarts.registerMap(currentMapInfo.name, currentMapInfo.map);
        let chartMap = this.$refs.mapBg
        const height = chartMap.clientHeight
        const width = chartMap.clientWidth
        this.myChart.getDom().style.height = `${height}px`;
        this.myChart.getDom().style.width = `${width}px`;
        // myChart.resize()

        // 绘制图表
        this.myChart.setOption({
          series: [this.getParams(currentMapInfo)],
          geo: {
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
          },
        });

        this.myChart.on('click', params => {
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

    formatData() {
      let val = []
      this.reals.map((item) => {
        val.push({ value: [...geoCoordMap[item.area], item.record] })
      })
      return val
    },

    getParams(currentMapInfo) {
      let series = {
        name: 'Top 5',
        type: 'scatter',
        coordinateSystem: "geo",
        data: this.formatData(),
        zlevel: 1
      }

      switch(currentMapInfo.name) {
        case '临沧市':
          series.aspectScale = 1 // 宽高比, 对应背景图
          series.top = '20%' 
          series.label = {
            show: true,
            position: 'top',
            distance: 20,
            padding: [10, 20],
            width: (1000 / designWidth) * document.body.clientHeight ,
            backgroundColor: {
              image: `${require('../assets/images/home/border.png')}`
            },
            formatter: (params) => {
              return [
                `              {title|${params.data.value[2].applicantUserRealName}} {title|${params.data.value[2].applicantUserPhoneNo}}\n`,
                `{icon|} {address|${params.data.value[2].applicantUserAddress}}\n`,
                `             {type|${getMediate[params.data.value[2].mediateType]}}`,
              ]
            },
            overflow: 'truncate',
            ellipsis: '...',
            rich: {
              icon: {
                borderWidth: 10,
                fontSize: 20,
                height: (200 / designHeight) * document.body.clientHeight,
                color: '#fff',
                backgroundColor: {
                  image: `${require('../assets/images/home/waring.png')}`
                },
              },
              title: {
                color:'#fff',
                fontSize:(60 / designHeight) * document.body.clientHeight
              },
              address: {
                color:'#fff',
                fontSize:(60 / designHeight) * document.body.clientHeight,
              },
              type: {
                color:'rgba(255, 64, 64, 1)',
                fontSize:(60 / designHeight) * document.body.clientHeight,
              }
            },
          },
          series.symbol = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAYAAAAAwr0iAAAAAXNSR0IArs4c6QAAAyxJREFUSEu9ll1IU2EYx//Pu3PO/KDsIuwi6EYpKjK2CdFNRNCXEglZdBUZVmzTiiIiikQCkQoh0E0rsbIrJaSC6qILC0oqtkkXRiAV0ZckfXhR2457n9h0onV2dvaB79Xg/f//z2/vx3NeQhaj0hdeIUGXGLSBgB/MfLOkSGsZrKNwpnGUqcHp1zcx8wABC2d7GXghbGp14DCNZ5KZEYDDH9kFplsEFBgXoddk07cFDhd9sAphGcDVET3KhDYAwjycv0imqmGvNmwFIj0AMzl90SYQNVkJTGgEfvIk7Qw1qE/SeUwBNjaxMlEa6wLJA+mCDOYjIN4XdNv7zLwpASoucrFSHO0HaHsWxRMWBmKC0Bhwa/5UGYYAFX4uVVi/D8CVujiNCMKh+LxkXAV4ZSotM58Pee3njOb/A3B1hcs4pjwEZLnZP5eSa4Yb7HfiGpcvUsOgATM9Q1wrGbO5B5tpcrZuDoCrPeqUhPtEWJJu2ZlRH/Jq3VMA0XpGfBXSDbprDyt7h47Tn6RyBqCyU98sJd8GsCBdzPT8DzC1Jn7b+DQkFln0PbNr6o6hevoe1ycAnP7IHjD1AtAshuQooxGORTeHGos/0/o2LowU6PH2WZRjamZ2EteDbqUuCfANQHFmCbmpCaI74FHqE1tQ2TlZJaU8AaBk+v6uTt3vZ47PPRBdgZSLQWgGsMwciT4B/HVaM6Kq6snnB2nMsA+4fPobBi83CXwZdKvrQMRxjaMzsgqSXhFgS+2hM0GP2vLvfFYAzNwa8tpPzw5z+vSPAC+dHwDgRsij7U8W29jDBb/+6N8JKJwXAAnxdtijlCWLOdr1DST4cZozkJctiBJELxAbXzCmnU22VUdntFJIrmXAAdAWY5C8nAHRE/QoKT/Nu/vYNjqe2Io5z7UpoLwAIEDgR2ZLLUFHja9wHgAI4p3E5DHA9tsIgpjXYOrZZjDyAJBj77N+CJ0+fcTsgZEVCNOpoFe9YK0R+fV+Zq7NqlAKE0NUhTzKA0sAa9sjq22Cnia/DbmD8MPgmFaNZpKWAOIiZ0e4nEnEe/dW42tlBUu8B7N/IqZcHj1CESPHX2WPUSxPVxV5AAAAAElFTkSuQmCC',
          series.symbolSize = 30,
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
    },

    initMqtt() {
      const { host, port, endpoint, ...options } = this.connection;
      const connectUrl = `wss://${host}${endpoint}`;
      try {
        this.client = mqtt.connect(connectUrl, options);
      } catch (error) {
      }

      this.client.on("connect", () => {
        this.doSubscribe();
      });
      this.client.on("error", (error) => {
      });
      this.client.on("message", (topic, message) => {
        let da = JSON.parse(message);
        this.reals.push(da)
      });
    },

    doSubscribe() {
      const { topic, qos } = this.subscription;
      this.client.subscribe(topic, qos, (error, res) => {
        if (error) {
          return;
        }
        this.subscribeSuccess = true;
      });
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