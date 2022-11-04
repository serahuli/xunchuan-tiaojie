<template>
  <div class="overview-infos">
    <div class="tag-wrap">

    </div>
    <div class="name-wrap">
      临沧市
    </div>
    <div class="map-wrap">
      <Map />
    </div>
    <div class="views-wrap"></div>
    <div class="info-wrap"></div>
  </div>
</template>

<script>
import { getConflictAreas } from '../apis/index'
import Map from './Map.vue'
export default {
  name: 'Overview',
  data() {
    return {
      
    }
  },
  mounted() {
    this.init()
  },
  components: { Map },
  methods: {
    init() {
      getConflictAreas()
      .then((res) => {
        this.conflictAreas = res
        let ele = this.$refs.conflict
        const lineWidth = ele.clientWidth;
        res.map((conflictArea) => {
          const scale = conflictArea.num / 10000;
          const realWidth = scale * lineWidth;
          item.width = `${realWidth}px`;
        })
      })
      .catch(() => this.conflictAreas = [])
    },
    getColorClass(index) {
      switch (index) {
        case 1:
          return 'tag-red';
        case 2:
          return 'tag-orange';
        case 3:
          return 'tag-yellow';
        default:
          return 'tag-blue'
        
      }
    }
  },

}
</script>

<style scoped lang="scss">
@import '../styles/utils.scss';
.overview-infos {
  position: relative;
  height: 100%;
  width: 100%;

  > .map-wrap {
    width: 100%;
    height: 100%;
  }
}
</style>