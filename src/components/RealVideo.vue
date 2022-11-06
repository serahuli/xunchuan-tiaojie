<template>
  <div class="center-box-wrap" v-if="isOpen">
    <div class="video-list-wrap">
      <div class="header">
        <div class="title">实时视频调解</div>
        <img @click="changeStatus()" src="../assets/images/home/close.png" class="close-icon">
      </div>

      <div class="subtitle">
        <div class="sub-item">
          时间: &nbsp;&nbsp;
          <div class="sub-content">
            {{ dayjs().format('YYYY年MM月DD日') }}
          </div>
        </div>
        <div class="sub-item">
          地区: &nbsp;&nbsp;
          <div class="sub-content">
            临沧市
          </div>
        </div>
      </div>

      <div class="table-wrap">
        <div class="table-header">
          <div class="code">调解码</div>
          <div class="application-user">申请人</div>
          <div class="ope-user">被申请人</div>
          <div class="mediate-user">调解员</div>
          <div class="time">调解时间</div>
          <div class="opt">操作</div>
        </div>
        <div class="table-item" v-for="(item, index) in list.slice(0, 9)" :key="index">
          <div class="code">{{item.mediateRecordId}}</div>
          <div class="application-user">{{item.applicantUserRealName}}</div>
          <div class="ope-user">{{item.respondentUserRealName}}</div>
          <div class="mediate-user">{{item.mediateName}}</div>
          <div class="time">{{item.appointmentTime}}</div>
          <div class="opt" @click="changeVideoStatus(item)">查看</div>
        </div>
      </div>
    </div>
    <div class="video-wrap" v-if="!!currentVideo">
      <div class="header">
        <div class="title">实时调解</div>
        <img @click="changeVideoStatus()" src="../assets/images/home/close.png" class="close-icon">
      </div>

      <div class="content">
        <Video
          v-for="item in newLayout"
          :model="templateMode"
          :item="item"
          :key="item.roster.id"
          :id="item.roster.id"
          :forceLayoutId="forceLayoutId"
          :client="client"
          @forceFullScreen="forceFullScreen"
        ></Video>
      </div>
    </div>
  </div>
</template>

<script>
import xyRTC from "@xylink/xy-rtc-sdk";
import Video from "./Video.vue";
export default {
  name: 'CenterBox',
  data() {
    return {
      list: [],
      isOpen: false,

      loading: true,
      client: null,
      stream: null,
      templateMode: "speaker", // 桌面布局模式(语音激励模式、画廊模式)
      forceLayoutId: "", // 全屏 roster id
      screenInfo: { rateWidth: 0, rateHeight: 0 }, // screen容器信息
      layout: [],
      currentVideo: null
    }
  },
  components: { Video },
  mounted() {
    this.$EventBus.$on("setVideoUrls", (res) => this.list = res)
    this.$EventBus.$on("setOpenStatus", (res) => this.isOpen = res)
  },
  computed: {
    layoutStyle() {
      const { rateWidth, rateHeight } = this.screenInfo;
      let style = {
        width: rateWidth + "px",
        height: rateHeight + "px",
      };
      return style;
    },
    newLayout() {
      return this.layout.filter((item) => item.roster.participantId);
    },
  },
  watch: {
    currentVideo: {
      handler(nv) {
        if(nv !== null) {
          this.join()
        }
      },
      deep: true,
    },
  },
  methods: {
    changeStatus() {
      this.$EventBus.$emit('setOpenStatus', false)
      this.isOpen = false
    },
    changeVideoStatus(video) {
      if(video) {
        this.currentVideo = video
      } else {
        this.currentVideo = null
      }
    },
    async join() {
      let callStatus = true;
      const isSupport = xyRTC.checkSupportWebRTC();
      if (!isSupport) {
        // 提示不支持WebRTC，请更新或使用其他浏览器
        // this.$message.error("不支持WebRTC，请更新或使用其他浏览器");
        return;
      }
      // createClient函数所有参数都是可选的，具体参数解释详见API
      // 此处示例配置了两个属性：layout和container，具体到自己的业务可自由配置
      this.client = await xyRTC.createClient({
        // 使用哪一种布局方式：
        // AUTO：自动布局，第三方只需要监听layout回调消息即可渲染布局和视频画面
        // CUSTOM：自定义布局，灵活性更高，但是实现较为复杂，自定义控制参会成员的位置、大小和画面质量
        layout: "AUTO",
        // 配置显示画面容器的信息
        container: {
          // AUTO布局时，自定义指定Layout显示容器
          // CUSTOM布局时，可以使用此元素自行计算显示容器的大小和每个参会成员的位置&大小信息
          elementId: "container",
          // AUTO布局时，Layout容器相对于elementId元素空间的偏移量，四个值分别对应：[上、下、左、右]
          // 如果没有配置elementId元素，默认使用Body空间大小计算信息
          offset: [0, 0, 0, 0],
        },
        clientId: "CQF1QDlUMzUvkjecJIkhr4vw",
        // clientId: "BR1e5cptJgyC1aFRtiXfmdg3",
      });
      const result = await this.client.loginExternalAccount({
        // 用户名自行填写
        displayName: "",
        // 企业id
        extId: "55afad43f5d5272efb9c8c6f30056a314a926a12",
        // extId: "0142901e3d83e0a1e225ef92b8663fcaebda7242",
        extUserId: "",
      });

      console.log("result000", result);

      if (result.msg !== "成功") {
        console.log("登录失败");
        return;
      }

      // 记录登录成功所获取的token信息，后续makeCall需要用到
      const token = result.detail.access_token;
      // console.log("token", token);
      this.initEventListener(this.client);

      console.log(this.currentVideo)

      callStatus = await this.client.makeCall({
        // 上一步骤登录获取到的token
        token: token,
        // 呼叫云会议室号码
        // confNumber: "9030258418",
        confNumber: this.currentVideo.roomNo,
        // 呼叫云会议室号码所对应的入会密码，没有则为空
        password: this.currentVideo.roomPwd,
        // 呼叫此会议号，入会显示的名称
        displayName: "",
      });

      if (callStatus) {
        this.loading = false;
        // 订阅全部参会者信息
        this.client.subscribeBulkRoster();
        this.stream = xyRTC.createStream();
        await this.stream.init({});
        this.client.publish(this.stream, { isSharePeople: true });
      }
    },

    async forceFullScreen(id = "") {
      await this.client.forceFullScreen(id);
    },

    // 监听client的内部消息
    initEventListener(client) {
      // 退会消息监听，注意此消息很重要，内部的会议挂断都是通过此消息通知
      client.on("disconnected", (e) => {
        // 收到此消息后，可以给用户提示，并进行退会处理。
      });

      // AUTO 布局回调layout数据，使用此数据直接渲染画面即可
      client.on("layout", (e) => {
        // AUTO 布局时，请直接渲染此列表数据即可
        // 如果是 Custom 布局（业务自定义）时，请监听 custom-layout 消息
      });

      // AUTO 布局时，获取展示Layout容器的宽高
      client.on("screen-info", (e) => {
        // 此处更新Layout容器的width/height
        this.screenInfo = e;
      });

      // 获取所有可播放的音频轨道数据，并进行播放处理
      client.on("audio-track", (e) => {
        // 此处获取到audio list数据后，直接渲染并播放即可，audio通道的流由底层控制，可不用关心
      });

      // AUTO 布局回调layout数据，使用此数据直接渲染画面即可
      // CUSTOM 布局不需要监听此数据
      client.on("layout", (e) => {
        console.log("layout", e);
        this.layout = e;
      });

      // current forcout roster id
      client.on("force-full-screen", (id) => {
        this.forceLayoutId = id;
      });

      // 获取入会状态
      client.on("call-status", (e) => {
        console.log("获取入会状态", e);
        // 10518 入会成功
        // 10519 正在呼叫中
        const { code, msg, detail } = e;

        // 入会成功
        if (code === "XYSDK:950518") {
          console.log("入会成功");

          // 清理呼叫Loading页面，开始显示参会人和本地Local画面
        }
      });
    },
  }
}
</script>

<style scoped lang="scss">
/* @import '../styles/utils.scss'; */
@import '../styles/utils2.scss';

.center-box-wrap {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;

  .video-list-wrap {
    width: vw(680);
    box-sizing: border-box;
    padding: vh(10) vw(15) vh(30) vw(15);
    background: url('../assets/images/home/video-bg.png');
    background-size: 100% 100%;

    .header {
      width: 100%;
      height: vh(75);
      line-height: vh(75);
      background: linear-gradient(180deg, #043EC1 0%, #000927 100%);
      font-size: vh(30);
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      position: relative;

      .close-icon {
        width: vh(32);
        height: vh(32);
        position: absolute;
        top: vh(22);
        right: vw(24);
        cursor: pointer;
      }
    }

    .subtitle {
      box-sizing: border-box;
      padding: 0 vw(20);
      height: vh(80);
      display: flex;
      font-size: vh(20);
      color: #FFFFFF;

      .sub-item {
        flex: 1;
        display: flex;
        align-items: center;

        .sub-content {
          flex-grow: 1;
          background: rgba(33, 89, 167, 0.42);
        }
      }
    }

    .table-wrap {
      font-size: vh(18);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      .table-header {
        height: vh(40);
        line-height: vh(40);
        display: flex;
        background: rgba(33, 89, 167, 0.42);
      }

      .table-item {
        height: vh(50);
        line-height: vh(50);
        display: flex;

        .opt {
          color: #65dbeb;
          cursor: pointer;
        }
      }

      .code {
        width: vw(100);
      }
      .application-user {
        width: vw(100);
      }
      .ope-user {
        width: vw(100);
      }
      .mediate-user {
        width: vw(100);
      }
      .time {
        flex-grow: 1;
      }
      .opt {
        width: vw(100);
      }
    }
  }

  .video-wrap {
    width: vw(600);
    box-sizing: border-box;
    padding: vh(10) vw(15) vh(30) vw(15);
    background: url('../assets/images/home/video-bg.png');
    background-size: 100% 100%;

    margin-left: vw(60);

    .header {
      width: 100%;
      height: vh(75);
      line-height: vh(75);
      font-size: vh(30);
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .close-icon {
        width: vh(32);
        height: vh(32);
        position: absolute;
        top: vh(22);
        right: vw(24);
        cursor: pointer;
      }
    }

    .content {
      width: 100%;
      height: vh(400);
    }
  }
}
</style>