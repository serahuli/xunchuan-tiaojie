<template>
  <div class="login-wrap">
    <div class="weather-wrap">
      <i :class="`weather-icon qi-${weatherIcon}`"></i>
      <div class="time"> {{ currentTime }} </div>
      <div class="address"> 临沧 </div>
      <div class="weather"> {{weather}} </div>
      <div class="temperature"> {{ temperature.min }}-{{ temperature.max }}℃</div>
    </div>

    <div class="header">
      <img src="../assets/images/login/logo.png" class="header-logo">
      <div class="header-title">
        无讼临沧·诉源治理
      </div>
    </div>

    <div class="container">
      <div class="left-wrap">
        <Box class="conflict-wrap" title="区域矛盾排名" subTitle="临沧市">
          <Conflict slot="container" />
        </Box>
        <Box class="mediate-wrap" title="调解员排名">
          <MediateUsers slot="container" />
        </Box>
        <Box class="history-wrap" title="历史矛盾增量">
          <History slot="container" />
        </Box>
      </div>
      <div class="center-wrap">
        <Overview />
      </div>
      <div class="right-wrap">
        <Box class="mediate-count" title="调解统计">
          <MediateRecords slot="container" />
        </Box>
        <Box class="conflict-percent" title="矛盾类型占比">
          <ConflictTypes slot="container" />
        </Box>
        <Box class="mediate-really" title="实时调解情况">
        </Box>
      </div>
    </div>
  </div>
</template>

<script>
import Box from '../components/Box.vue'
import Conflict from '../components/Conflict.vue'
import MediateUsers from '../components/MediateUsers.vue'
import History from '../components/History.vue'
import MediateRecords from '../components/MediateRecords.vue'
import ConflictTypes from '../components/ConflictTypes.vue'
import Overview from '../components/Overview.vue'

import { getWeathers } from '../apis/index'

export default {
  name: 'Home',
  data () {
    return {
      temperature: { min: '0', max: '0' },
      weather: undefined,
      weatherIcon: undefined,
      currentTime: undefined,
    }
  },
  components: { Conflict, Box, MediateUsers, History, MediateRecords, ConflictTypes, Overview },
  mounted() {
    this.initWeathers()
    setInterval(() => {
      this.initTime()
    }, 1000)
  },
  methods: {
    initWeathers() {
      getWeathers()
      .then(res => {
        this.temperature = {
          min: res.tempMin,
          max: res.tempMax
        },
        this.weather = res.textDay
        this.weatherIcon = res.iconDay
      })
    },
    initTime() {
      this.currentTime = this.dayjs().format("YYYY-MM-DD HH:mm")
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/font.css';
@import '../styles/utils.scss';
.login-wrap {
  width: 100%;
  height: 100%;
  font-size: 0;
  position: relative;
  background-image: url('../assets/images/home/bg.png');
  background-size: 100vw 100vh;

  .header {
    position: absolute;
    top: vh(80);
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;

    display: flex;
    align-items: center;

    .header-logo {
      width: vw(170);
      height: vh(194);
    }

    .header-title {
      font-size: vh(175);
      font-family: 'YouSheBiaoTiHei';
      font-weight: 400;
      color: #FFFFFF;
      margin-left: vw(30);
    }
  }

  .weather-wrap {
    position: absolute;
    top: vh(206);
    left: vw(216);
    font-size: vh(72);
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    color: #FFFFFF;

    display: flex;
    align-items: center;

    .weather-icon {
      font-size: vh(119);
    }

    > div {
      margin-left: vw(20);
    }
  }

  .container {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: vh(397) vw(129) vh(91) vw(129);
    .left-wrap {
      width: vw(1280);
      height: 100%;

      > .conflict-wrap {
        width: vw(1152);
        height: vh(939);
        box-sizing: border-box;
        padding: vh(33) vw(51) vh(57) vw(65);
        color: #FFFFFF;
      }

      > .mediate-wrap {
        width: vw(1152);
        height: vh(876);
        padding: vh(16) vw(23) vh(105) vw(45);
        color: #FFFFFF;
        margin-top: vh(26);
      }

      > .history-wrap {
        width: vw(1152);
        height: vh(861);
        padding: vh(34) vw(26) vh(61) vw(80);
        margin-top: vh(50);
      }
    }

    .center-wrap {
      width: vw(3200);
      height: 100%;
    }

    .right-wrap {
      width: vw(1280);
      height: 100%;

      > .mediate-count {
        width: vw(1152);
        height: vh(573);
        color: #FFFFFF;
      }

      > .conflict-percent {
        width: vw(1152);
        height: vh(861);
        color: #FFFFFF;
        margin-top: vh(27);
      }

      > .mediate-really {
        width: vw(1152);
        height: vh(1245);
        color: #FFFFFF;
        margin-top: vh(47);
      }
    }
  }
}
</style>