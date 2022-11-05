<template>
  <div class="overview-infos">
    <div class="view-info">
      <div class="view-info__left">
        <img :src="imageUrl" class="tag-wrap" alt="">
        <div class="name-wrap">
          {{$route.query.countryName}}
        </div>
        <div class="map-wrap">
          <Map />
        </div>
      </div>
    </div>
    <div class="movies-wrap"></div>
  </div>
</template>

<script>
import { getUserInfos, getHazardLevel } from '@/apis/index'
import Map from '@/components/Map.vue'
export default {
  name: 'Center',
  data() {
    return {
      userData: undefined,
      imageUrl: require('../../assets/images/home/tag-green.png'),
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
        '低风险': require('../../assets/images/home/tag-green.png'),
        '中风险': require('../../assets/images/home/tag-orange.png'),
        '高风险': require('../../assets/images/home/tag-red.png'),
      }
      getHazardLevel().then(res => this.imageUrl = hazards[res.hazardLevel])
    },
  },

}
</script>

<style scoped lang="scss">
@import '../../styles/utils.scss';
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
  }

  > .movies-wrap {}

}
</style>