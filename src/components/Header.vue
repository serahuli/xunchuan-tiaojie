<template>
  <div class="header-wrap">
    <div class="weather-wrap">
      <i :class="`weather-icon qi-${today.iconDay}`"></i>
      <div class="time"> {{ currentTime }} </div>
      <div class="address"> 临沧 </div>
      <div class="weather"> {{today.textDay}} </div>
      <div class="temperature"> {{ today.tempMin }}-{{ today.tempMax }}℃</div>
    </div>

    <div class="header">
      <img src="../assets/images/login/logo.png" class="header-logo">
      <div class="header-title">
        无讼临沧·诉源治理
      </div>
    </div>

    <img 
      v-if="$route.path !== '/'"
      class="right-back" 
      src="../assets/images/country/back.png" 
      @click="toCityPage()"
    />
  </div>
</template>

<script>
import { getWeathers } from '@/apis/index'

export default {
  name: 'Header',
  data () {
    return {
      today: undefined,
      currentArea: '临沧市',
      currentTime: undefined
    }
  },
  mounted() {
    this.initWeathers()
    this.initTime()
    setInterval(() => {
      this.initTime()
    }, 1000)
  },
  methods: {
    initWeathers() {
      getWeathers().then(res => this.today = res)
    },
    initTime() {
      this.currentTime = this.dayjs().format("YYYY-MM-DD HH:mm")
    },
    toCityPage() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/utils.scss';

.header-wrap {
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

  .right-back {
    height: vh(200);

    position: absolute;
    top: vh(200);
    right: vw(200);
    cursor: pointer;
    z-index: 6;
  }
}

</style>