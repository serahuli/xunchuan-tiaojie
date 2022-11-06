<template>
  <Box title="实时调解视频">
    <div slot="container" class="video-wrap">
      <div class="video-item" v-for="(video, index) in videoList" :key="index">
        <div class="video-header">
          <span class="video-id">
            {{video.mediateRecordId}}
          </span>
          <span class="video-info">
            {{video.mediateName}}
          </span>
        </div>
        <div class="video-footer">
          <span class="video-id">
            当事人: {{video.applicantUserRealName}}
          </span>
          <span class="video-address">
            {{video.area}}
          </span>
        </div>
      </div>
      <div class="enlarge-part" @click="changeStatus()">
        <img src="../assets/images/home/enter.png" alt="">
        查看更多
      </div>
    </div>
  </Box>
</template>

<script>
import Box from './Box.vue'
import { getShare } from '../apis/index'
export default {
  name: 'Bottom',
  data() {
    return {
      videoList: []
    }
  },
  mounted() {
    this.initShareUrls()
  },
  components: { Box },
  methods: {
    initShareUrls() {
      getShare().then(res => {
        this.videoList = res
        this.$EventBus.$emit("setVideoUrls", res)
      })
    },
    changeStatus() {
      this.$EventBus.$emit("setOpenStatus", true)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/utils.scss';
.video-wrap {
  display: flex;
  overflow: hidden;
  height: 100%;
  margin-top: vh(20);
  font-size: vh(26);
  color: rgba(255, 255, 255, .8);
  position: relative;

  .video-item {
    flex-grow: 0;
    flex-shrink: 0;
    width: vw(500);
    height: 100%;
    background: url('../assets/images/home/video.png');
    background-size: vw(500) 100%;
    background-repeat: no-repeat;
    position: relative;

    .video-header {
      position: absolute;
      top: 0;
      padding: vh(10) vw(14);

      .video-id {
        border: 1px solid rgba(255, 255, 255, .8);
      }

      .video-info {
        margin-left: vw(20);
      }
    }

    .video-footer {
      width: 100%;
      position: absolute;
      bottom: 0;
      box-sizing: border-box;
      padding: vh(10) vw(14);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &:not(:first-child) {
      margin-left: vw(40);
    }
  }

  .enlarge-part {
    position: absolute;
    right: 0;
    height: 100%;
    background: rgba(0, 19, 79, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 vw(20);
    cursor: pointer;

    > img {
      width: vw(100);
      margin-bottom: vh(20);
    }
  }
}
</style>