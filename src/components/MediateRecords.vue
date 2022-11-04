<template>
  <div class="mediate-wrap">
    <div class="circle-wrap">
      <CircleProgress  
        id="1"
        :radius="20"
        :progress="75"
        :isAnimation="true"
        :gradientsColor='[ { offset: "0%", color: "#60cbb9" },{ offset: "100%", color: "#614ef6" } ]'
      >
        <div class="inner-container">
          <div class="show-num">95%</div>
          <div class="show-title">已完成</div>
        </div>
      </CircleProgress>
    </div>

    <div class="show-groups">
      <div class="show-item">
        <img src="../assets/images/home/tag-orange.png" class="left-img">
        <div class="right">
          <div class="top">{{mediateRecords['总调解']}}</div>
          <div class="bottom">总调解</div>
        </div>
      </div>
      <div class="show-item">
        <img src="../assets/images/home/tag-orange.png" class="left-img">
        <div class="right">
          <div class="top">{{mediateRecords['已调解']}}</div>
          <div class="bottom">已调解</div>
        </div>
      </div>
      <div class="show-item">
        <img src="../assets/images/home/tag-orange.png" class="left-img">
        <div class="right">
          <div class="top">{{mediateRecords['调解中']}}</div>
          <div class="bottom">未调解</div>
        </div>
      </div>
    </div>

    <div class="prev-wrap">昨日调解数量：22</div>
  </div>
</template>

<script>
import CircleProgress  from 'vue-circleprogressbar';
import { getMediateRecords } from '../apis/index'
export default {
  name: 'MediateRecords',
  data() {
    return {
      mediateRecords: undefined
    }
  },
  components: { CircleProgress },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getMediateRecords()
      .then((res) => {
        this.mediateRecords = res
      })
      .catch((err) => this.mediateRecords = err)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/utils.scss';

.mediate-wrap {
  display: flex;
  position: relative;
  .circle-wrap {
    width: vw(353);
    height: vw(353);
    margin-top: vh(80);
    position: relative;

    .inner-container {
      width: 100%;
      height: 100%;
      color: #fff;
      text-align: center;
      position: absolute;
      top: vh(40);
      .show-num {
        font-size: vh(42);
        font-weight: 900;
      }

      .show-title {
        font-size: vh(20);
        font-weight: 400;
      }
    }
  }

  .show-groups {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    margin-left: vw(130);

    .show-item {
      height: vh(107);
      width: 100%;
      display: flex;
      &:not(:first-child) {
        margin-top: vh(33);
      }

      .left-img {
        width: vh(107);
        margin-right: vw(77);
      }

      .right {
        .top {
          font-size: vh(50);
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