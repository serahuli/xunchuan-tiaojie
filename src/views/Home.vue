<template>
  <div class="login-wrap">
    <Header />

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
          <Real slot="container" />
        </Box>
      </div>
    </div>

    <RealVideo />

    <div class="pop-c" v-if="show"></div>
  </div>
</template>

<script>
import Box from '@/components/Box.vue'
import Conflict from '@/components/Conflict.vue'
import MediateUsers from '@/components/MediateUsers.vue'
import History from '@/components/History.vue'
import MediateRecords from '@/components/MediateRecords.vue'
import ConflictTypes from '@/components/ConflictTypes.vue'
import Overview from '@/components/Overview.vue'
import Real from '@/components/RealMediate.vue'
import Header from '@/components/Header.vue'
import RealVideo from '@/components/RealVideo.vue'

export default {
  name: 'Home',
  components: { Conflict, Box, MediateUsers, History, MediateRecords, ConflictTypes, Overview, Real, Header, RealVideo },
  data() {
    return {
      show: false,
    }
  },
  mounted() {
    this.$EventBus.$on("setOpenStatus", (res) => this.show = res)
  },
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
      width: 360px;
      height: 100%;
      display: flex;
      flex-shrink: 0;
      flex-direction: column;

      > .conflict-wrap {
        width: 100%;
        box-sizing: border-box;
        color: #FFFFFF;
        flex:1
      }

      > .mediate-wrap {
        width: 100%;
        color: #FFFFFF;
        margin-top: vh(26);
        flex: 1;
      }

      > .history-wrap {
        flex-shrink: 1;
        width: 100%;
        margin-top: vh(50);
      }
    }

    .center-wrap {
      width: vw(3200);
      height: 100%;
    }

    .right-wrap {
      flex-shrink: 0;
      width: 360px;
      height: 100%;
      display: flex;
      flex-direction: column;

      > .mediate-count {
        width: 100%;
        color: #FFFFFF;
      }

      > .conflict-percent {
        width: 100%;
        color: #FFFFFF;
        margin-top: vh(27);
      }

      > .mediate-really {
        flex-grow: 1;
        width: 100%;
        color: #FFFFFF;
        margin-top: vh(47);
      }
    }
  }
}

.pop-c {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: rgba(0,0,0,0.3);
}
</style>