<template>
  <div class="overview-infos">
    <div class="view-info">
      <div class="view-info__left">
        <img :src="imageUrl" class="tag-wrap" alt="">
        <div class="name-wrap">
          {{currentArea}}
        </div>
        <div class="map-wrap">
          <Map />
        </div>
      </div>
      <div class="view-info__right">
        <div class="view-item">
          <img class="left-img" src="../assets/images/home/over1.png" />
          <div class="right-info">
            <div class="num">{{userData.litigantUserCOunt}}</div>
            <div class="tip">当事人</div>
          </div>
        </div>
        <div class="view-item">
          <img class="left-img" src="../assets/images/home/over2.png" />
          <div class="right-info">
            <div class="num">{{userData.mediateUserCount}}</div>
            <div class="tip">调解员</div>
          </div>
        </div>
        <div class="view-item">
          <img class="left-img" src="../assets/images/home/over3.png" />
          <div class="right-info">
            <div class="num">{{userData.jxyCount}}</div>
            <div class="tip">接线员</div>
          </div>
        </div>
        <div class="view-item">
          <img class="left-img" src="../assets/images/home/over4.png" />
          <div class="right-info">
            <div class="num">{{userData.jcyCount}}</div>
            <div class="tip">基层院</div>
          </div>
        </div>
      </div>
    </div>
    <div class="movies-wrap"></div>
  </div>
</template>

<script>
import { getUserInfos, getHazardLevel } from '@/apis/index'
import Map from './Map.vue'
export default {
  name: 'Overview',
  data() {
    return {
      userData: undefined,
      imageUrl: require('../assets/images/home/tag-green.png'),
      currentArea: '临沧市'
    }
  },
  mounted() {
    this.init()
    setInterval(() => this.init(), 30 * 60 * 1000)
  },
  components: { Map },
  methods: {
    init() {
      getUserInfos().then((res) => this.userData = res);

      const hazards = {
        '低风险': require('../assets/images/home/tag-green.png'),
        '中风险': require('../assets/images/home/tag-orange.png'),
        '高风险': require('../assets/images/home/tag-red.png'),
      }
      getHazardLevel().then(res => this.imageUrl = hazards[res.hazardLevel])
    },
  },

}
</script>

<style scoped lang="scss">
@import '../styles/utils.scss';
.overview-infos {
  position: relative;
  height: 100%;
  width: 100%;

  > .view-info {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    > .view-info__left {
      flex-grow: 1;
      height: 100%;
      position: relative;
      margin-right: vw(100);

      > .tag-wrap {
        position: absolute;
        top: 0;
        left: vw(300);
        width: vh(316);
        height: vh(316);
      }

      > .name-wrap {
        font-size: vh(200);
        font-family: Source Han Sans CN;
        font-weight: 800;
        color: #B6F8F8;
        position: absolute;
        top: vh(416);
        left: vw(170);
      }

      > .map-wrap {
        width: 100%;
        height: 100%;
      }
    }
    > .view-info__right {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-right: vw(100);

      .view-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: vh(376);
        height: vh(216);
        background: #0A225C;
        padding: vh(48) vw(48) vh(48) vw(32);
        box-sizing: border-box;
        &:not(:first-child) {
          margin-top: vh(52);
        }

        .left-img {
          height: vh(120);
        }

        .right-info {
          display: flex;
          flex-direction: column;

          .num {
            font-size: vh(68);
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: rgba(248, 182, 44, 0.8);
          }
          .tip {
            font-size: vh(40);
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(188, 226, 248, 0.8);
          }
        }
      }
    }
  }

  > .movies-wrap {}

}
</style>