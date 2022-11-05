<template>
  <div class="right-wrap">
    <div class="list-wrap" v-if="isOpen">
      <div class="header">
        <div class="left">
          <div class="title">实时动态</div>
          <div class="title-border"></div>
        </div>
        <img class="right-close__img" @click="changeOpenStatus()" src="../../assets/images/country/close.png" alt="" />
      </div>
      <div class="body">
        <div class="point-wrap">
          <div class="point" v-for="(real, index) in reals" :key="index">
            <img src="../../assets/images/country/point.png" />
          </div>
        </div>
        <div class="table-wrap">
          <div class="table-item" v-for="(real, index) in reals" :key="index">
            <div class="date">{{real.date}}</div>
            <div class="name">{{real.name}}</div>
            <div class="status">{{real.status}}</div>
            <div class="address">{{real.address}}</div>
            <div class="name">{{real.name}}</div>
            <div class="status">{{real.status}}</div>
            <div class="address">{{real.address}}</div>
          </div>
        </div>
        
      </div>
    </div>
    <img v-else @click="changeOpenStatus()" class="right-open__img" src="../../assets/images/country/open.png" />
  </div>
</template>

<script>
import { getMediateRecordByArea } from '@/apis/index'
export default {
  name: 'Records',
  data() {
    return {
      isOpen: false,
      reals: []
    }
  },
  mounted() {
    this.init();
    setInterval(() => this.init(), 30 * 60 * 1000)
  },
  methods: {
    changeOpenStatus() {
      this.isOpen = !this.isOpen
    },
    init() {
      getMediateRecordByArea(this.$route.query.countryName)
      .then((res) => {
        let len = 8 - res.length;
        for(let i = 0; i < len; i++) {
          res.push({})
        }
        this.reals = res.slice(0, 8)
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../styles/utils.scss';

.right-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  color: #fff;

  .right-open__img {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-50%, -50%);
    width: vw(300);
    cursor: pointer;
  }

  .right-close__img {
    width: vw(200);
    height: vw(200);
    cursor: pointer;
  }

  .list-wrap {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    padding: vh(40) vw(100);
    background: rgba(0, 39, 154, 0.54);
    box-shadow: inset 1px 16px 69px 34px rgba(0, 19, 79, 0.6);
    border: 1px solid rgba(64, 118, 255, 0.4);
    
    .header {
      height: vh(300);
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        flex-direction: column;

        .title {
          font-size: vh(90);
          height: vh(200);
          line-height: vh(200);
        }

        .title-border {
          padding: 0 vw(200) 0 0;
          width: 100%;
          height: vh(20);
          background: linear-gradient(90deg, rgba(64, 118, 255, 0.5),rgba(154, 69, 0, 0));
        }
      }
    }

    .body {
      display: flex;

      .point-wrap {
        width: vw(40);
        display: flex;
        flex-direction: column;
        align-items: center;

        .point {
          display: flex;
          align-items: center;
          height: vh(140);
          width: vw(40);
          line-height: vh(140);

          > img {
            width: vw(40);
            height: vw(40);
          }
        }
      }

      .table-wrap {
        display: flex;
        flex-direction: column;
        margin-left: vw(20);
        .table-item {
          display: flex;
          height: vh(140);
          line-height: vh(140);
          font-size: vh(50);
          white-space: nowrap;
          word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis; 
          &:nth-child(2n) {
            background: rgba(96, 153, 234, 0.15);
          }
        }
      }

      .date {
        width: vw(500);
      }
      .name {
        width: vw(100);
      }

      .status {
        width: vw(300);
      }
      .address {
        flex: 1;
        width: vw(500);
      }
    }
  }
}
</style>