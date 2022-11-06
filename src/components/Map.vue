<template>
  <div class="map-container" ref="mapBg">
    <div ref="mapChart" id="mapChart"></div>
  </div>
</template>

<script>

import { designWidth, designHeight } from '../styles/utils.scss'
import { mapData, geoCoordMap, getMediate } from '@/utils'
import * as mqtt from 'mqtt'
export default {
  name: 'ConflictTypes',
  data() {
    return {
      conflictTypes: [],
      currentMap: '临沧市',
      data: {
        "searchValue": null,
        "createBy": null,
        "createTime": "2022-10-28 10:54:01",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "mediateRecordId": 101256,
        "applicantUserId": null,
        "detail": null,
        "applicantUserRealName": "杨正明",
        "applicantUserPhoneNo": "15126451050",
        "applicantUserSex": "男",
        "applicantUserIdCardNo": "533521195401090317",
        "applicantUserRemark": null,
        "applicantUserHeadImage": "https://jie.xctsoft.com:8080/profile/download/1665710543496.jpg",
        "applicantUserAddress": "云南省临沧市临翔区蚂蚁堆乡",
        "respondentUserId": null,
        "respondentUserRealName": "田尼门",
        "respondentUserPhoneNo": "13759386000",
        "respondentUserIdCardNo": null,
        "respondentUserRemark": null,
        "respondentUserHeadImage": null,
        "respondentUserAddress": null,
        "respondentUserSex": "男",
        "mediateType": 8,
        "mediateStatus": "00",
        "mediatorUserId": null,
        "mediatorUserRealName": null,
        "mediateForm": null,
        "applicationChannel": 1,
        "endTime": null,
        "mediateDetail": "请法院依法判令：1、撤销原、被告共同签订的《农田租赁协议》；2、立即垦复并交还所租用的1亩山地；3、赔偿2022年的损失2000.00元。",
        "area": "临翔区",
        "street": null,
        "mediateCount": 0,
        "queryCon": null,
        "mediateDesc": "",
        "flows": [],
        "attachs": [],
        "inviteList": [],
        "evidence": [],
        "confirm": [],
        "jconfirm": [],
        "lastCallTime": "2022-10-28 10:54:01",
        "lastSysUserId": 101,
        "callCount": 2,
        "stakeholder": null,
        "delTag": "0",
        "endType": null,
        "endReason": null,
        "endUserId": null,
        "endUserName": null,
        "endUserType": null,
        "litigantUserPhone": null,
        "applicantList": [],
        "respondentList": [],
        "applicantUserType": "1",
        "respondentUserType": "2",
        "applicantIdCardAddress": null,
        "respondentIdCardAddress": null,
        "applicantJob": null,
        "respondentJob": null,
        "applicantCompany": null,
        "respondentCompany": "耿马孟定顶峰进出口有限公司临沧分公司",
        "applicantDeliveryAddress": null,
        "respondentDeliveryAddress": null,
        "applicantOrgNo": null,
        "respondentOrgNo": "0000",
        "applicantProxyType": null,
        "respondentProxyType": null,
        "applicantPracticeNo": null,
        "respondentPracticeNo": null,
        "totalCount": null,
        "sysUserId": 101,
        "mediateTypeName": null,
        "litigantUserName": null,
        "litigantUserId": null,
        "mediateStatusList": null,
        "keyLevel": 1,
        "seqNo": -1007
      }
    }
  },
  mounted() {
    this.initMapChart()

    this.initMqtt();
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
        name: 'Top 5',
        type: 'scatter',
        coordinateSystem: "geo",
        data: [
          {
            name: '00',
            value: [99.402495, 23.534579, { 
              applicantUserRealName: '张斌',
              applicantUserPhoneNo: '13455553637',
              "applicantUserAddress": "云南省临沧市临翔区蚂蚁堆乡",
              mediateType: 1,
            }]
          }
        ],
        symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAYAAAAAwr0iAAAAAXNSR0IArs4c6QAAAyxJREFUSEu9ll1IU2EYx//Pu3PO/KDsIuwi6EYpKjK2CdFNRNCXEglZdBUZVmzTiiIiikQCkQoh0E0rsbIrJaSC6qILC0oqtkkXRiAV0ZckfXhR2457n9h0onV2dvaB79Xg/f//z2/vx3NeQhaj0hdeIUGXGLSBgB/MfLOkSGsZrKNwpnGUqcHp1zcx8wABC2d7GXghbGp14DCNZ5KZEYDDH9kFplsEFBgXoddk07cFDhd9sAphGcDVET3KhDYAwjycv0imqmGvNmwFIj0AMzl90SYQNVkJTGgEfvIk7Qw1qE/SeUwBNjaxMlEa6wLJA+mCDOYjIN4XdNv7zLwpASoucrFSHO0HaHsWxRMWBmKC0Bhwa/5UGYYAFX4uVVi/D8CVujiNCMKh+LxkXAV4ZSotM58Pee3njOb/A3B1hcs4pjwEZLnZP5eSa4Yb7HfiGpcvUsOgATM9Q1wrGbO5B5tpcrZuDoCrPeqUhPtEWJJu2ZlRH/Jq3VMA0XpGfBXSDbprDyt7h47Tn6RyBqCyU98sJd8GsCBdzPT8DzC1Jn7b+DQkFln0PbNr6o6hevoe1ycAnP7IHjD1AtAshuQooxGORTeHGos/0/o2LowU6PH2WZRjamZ2EteDbqUuCfANQHFmCbmpCaI74FHqE1tQ2TlZJaU8AaBk+v6uTt3vZ47PPRBdgZSLQWgGsMwciT4B/HVaM6Kq6snnB2nMsA+4fPobBi83CXwZdKvrQMRxjaMzsgqSXhFgS+2hM0GP2vLvfFYAzNwa8tpPzw5z+vSPAC+dHwDgRsij7U8W29jDBb/+6N8JKJwXAAnxdtijlCWLOdr1DST4cZozkJctiBJELxAbXzCmnU22VUdntFJIrmXAAdAWY5C8nAHRE/QoKT/Nu/vYNjqe2Io5z7UpoLwAIEDgR2ZLLUFHja9wHgAI4p3E5DHA9tsIgpjXYOrZZjDyAJBj77N+CJ0+fcTsgZEVCNOpoFe9YK0R+fV+Zq7NqlAKE0NUhTzKA0sAa9sjq22Cnia/DbmD8MPgmFaNZpKWAOIiZ0e4nEnEe/dW42tlBUu8B7N/IqZcHj1CESPHX2WPUSxPVxV5AAAAAElFTkSuQmCC',
        symbolSize: 30,
        label: {
          show: true,
          position: 'top',
          distance: 20,
          padding: [10, 20],
          width: (1000 / designWidth) * document.body.clientHeight ,
          backgroundColor: {
            image: `${require('../assets/images/home/border.png')}`
          },
          formatter: (params) => {
            console.log(params, 'sera');
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
        zlevel: 1
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
    },

    initMqtt() {
      let commonApi = "tcp://101.132.152.117:1883";
      const client = mqtt.connect(commonApi, {
        username: 'xct',
        password: 'Xct@24303'
      });
      client.on("connect", function () {
        console.log("连接成功....");
      });
      //如果连接错误，打印错误
      client.on("error", function (err) {
        console.log("err=>", err);
        vm.client.end();
      });
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