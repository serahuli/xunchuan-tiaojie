<template>
  <div class="mediate-wrap">
    <svg class="circle" width="140">
      <defs>
        <linearGradient x1="1" y1="0" x2="0" y2="0" id="gradient3">
          <stop offset="0%" stop-color="#b0cbb9"></stop>
          <stop offset="100%" stop-color="#614ef6"></stop>
        </linearGradient>
      </defs>
      <circle  cx="70" cy="70" r="45" fill="none" stroke-width="14" stroke="url('#gradient3')"></circle>
      <text x="70" y="65"  style="font-size: 18px;" fill="#fff" text-anchor="middle">
        <tspan class="text">{{mediateRecords['已完成']}}</tspan>
      </text>
      <text x="70" y="85" style="font-size: 12px;" fill="#fff" text-anchor="middle">
        <tspan class="text">已完成</tspan>
      </text>
    </svg>

    <div class="show-groups">
      <div class="show-item">
        <img src="../assets/images/home/1.jpg" class="left-img">
        <div class="right">
          <div class="top">{{mediateRecords['总调解']}}</div>
          <div class="bottom">总调解</div>
        </div>
      </div>
      <div class="show-item">
        <img src="../assets/images/home/2.jpg" class="left-img">
        <div class="right">
          <div class="top">{{mediateRecords['已调解']}}</div>
          <div class="bottom">已调解</div>
        </div>
      </div>
      <div class="show-item">
        <img src="../assets/images/home/3.jpg" class="left-img">
        <div class="right">
          <div class="top">{{mediateRecords['调解中']}}</div>
          <div class="bottom">未调解</div>
        </div>
      </div>
    </div>

    <div class="prev-wrap">昨日调解数量：{{mediateRecords['昨日调解数量']}}</div>
  </div>
</template>

<script>
import { getMediateRecords, getCountryMediateInfo } from '@/apis/index'
export default {
  name: 'MediateRecords',
  data() {
    return {
      mediateRecords: undefined
    }
  },
  mounted() {
    this.init()
    setInterval(() => this.init(), 30 * 60 * 1000)
  },
  methods: {
    init() {
      const { path, query } = this.$route
      if(path === '/') {
        getMediateRecords().then((res) => this.mediateRecords = res)
      } else {
        getCountryMediateInfo(query.countryName).then((res) => this.mediateRecords = res)
      }
      
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/utils.scss';

.mediate-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  align-items: center;

  .circle {
    display: flex;
    margin-top: vh(30);
  }

  .show-groups {
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    margin-left: vw(130);

    .show-item {
      width: 100%;
      display: flex;
      align-items: center;
      &:not(:first-child) {
        margin-top: vh(12);
      }

      .left-img {
        height: vh(100);
        width: vh(100);
        margin-right: vw(77);
      }

      .right {
        .top {
          font-size: vh(80);
          font-weight: 400;
          color: #FCB72B;
        }

        .bottom {
          font-size: vh(24);
          color: #FFFFFF;
        }
      }
    }
  }

  .prev-wrap {
    position: absolute;
    top: vh(-60);
    right: 0;
    font-size: vh(24);
    color: #FFFFFF;
  }
}
</style>