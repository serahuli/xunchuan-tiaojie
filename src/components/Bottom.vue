<template>
  <div class="box-wrap">
    <Box></Box>
  </div>
</template>

<script>
import Box from './Box.vue'
import xyRTC from '@xylink/xy-rtc-sdk';
export default {
  name: 'Box',
  props: {
    title: '',
    subTitle: '',
  },
  methods: {
    init() {
      const isSupport = xyRTC.checkSupportWebRTC();

      if (!isSupport) {
        // 提示不支持WebRTC，请更新或使用其他浏览器
        message.info('Not support webrtc');

        return;
      }


      // createClient函数所有参数都是可选的，具体参数解释详见API
      // 此处示例配置了两个属性：layout和container，具体到自己的业务可自由配置
      const client = xyRTC.createClient({
        // 使用哪一种布局方式：
        // AUTO：自动布局，第三方只需要监听layout回调消息即可渲染布局和视频画面
        // CUSTOM：自定义布局，灵活性更高，但是实现较为复杂，自定义控制参会成员的位置、大小和画面质量
        layout: 'AUTO',
        // 配置显示画面容器的信息
        container: {
          // AUTO布局时，自定义指定Layout显示容器
          // CUSTOM布局时，可以使用此元素自行计算显示容器的大小和每个参会成员的位置&大小信息
          elementId: '',
          // AUTO布局时，Layout容器相对于elementId元素空间的偏移量，四个值分别对应：[上、下、左、右]
          // 如果没有配置elementId元素，默认使用Body空间大小计算信息
          offset: [32, 60, 20, 20],
        },
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/utils.scss';

.box-wrap {
  width: 100%;
  height: 100%;
  background: url('../assets/images/home/left-top.png');
  background-size: 100% 100%;
  box-sizing: border-box;
  color: #FFFFFF;
  padding: vh(33) vw(45) vh(48) vw(81);
  position: relative;

  .box-wrap--title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: start;
      font-size: vh(56);
      font-weight: 800;
      color: #FFFFFF;

      .left-bottom-border {
        width: vw(260);
        height: vh(6);
        margin-top: vh(18);
      }
    }

    .right {
      font-size: vh(36);
    }
  }
}
</style>