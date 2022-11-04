<template>
  <div class="conflict-infos">
    <div 
      class="conflict-item" 
      v-for="(conflict, index) in conflictAreas" 
      :key="index" 
    >
      <div :class="['conflict-index', getColorClass(index + 1)]">{{index + 1}}</div>
      <img class="conflict-arrow" src="../assets/images/home/arrow.png" alt="">
      <div class="conflict-area">{{conflict.area}}</div>
      <div class="percent-wrap" ref="conflict">
        <div class="percent-num" :style="{ width: conflict.width }"></div>
      </div>
      <div class="conflict-num">{{conflict.num}}</div>
    </div>
  </div>
</template>

<script>
import { getConflictAreas } from '../apis/index'

export default {
  name: 'Conflict',
  data() {
    return {
      conflictAreas: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getConflictAreas()
      .then((res) => {
        this.conflictAreas = res
        
        this.$nextTick(() => {
          let ele = this.$refs.conflict[0]
          const lineWidth = ele.clientWidth;
          const copyList = res

          for(let i = 0; i < copyList.length; i++) {
            const scale = copyList[i].num / 10000;

            const realWidth = scale * lineWidth;
            copyList[i].width = `${realWidth}px`;
          }

          this.conflictAreas = copyList
          this.$forceUpdate()
        })
      })
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
.conflict-infos {
  margin-top: vh(59);

  .conflict-item {
    width: 100%;
    height: vh(53);
    font-size: vh(33);
    margin-top: vh(38);
    display: flex;
    align-items: center;
    position: relative;
    .conflict-index {
      width: vw(47);
      height: vh(54);
      line-height: vh(54);
      border-radius: vw(2);
      font-size: vh(28);

      &.tag-red {
        background: #FF3232;
      }
      &.tag-orange {
        background: #FF9800;
      }
      &.tag-yellow {
        background: #FFD200;
      }
      &.tag-blue {
        background: #3D8FFF;
      }
    }

    .conflict-arrow {
      width: vw(52);
      height: vh(53);
      margin-left: vw(10);
    }

    .conflict-area {
      width: vw(200);
      font-size: vh(33);
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #FFFFFF;
      white-space: nowrap;
      overflow: hidden; 
      text-overflow: ellipsis; 
      margin-left: vw(10);
      text-align: left;
    }

    .percent-wrap {
      width: vw(543);
      height: vh(19);
      background: #062969;
      border-radius: vw(4);

      .percent-num {
        height: 100%;
        background: linear-gradient(90deg, #3D8FFF 0%, #00CCFF 100%);
      }
    }

    .conflict-num {
      margin-left: vw(20);
    }

    
  }
}
</style>