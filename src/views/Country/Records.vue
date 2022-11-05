<template>
  <Box title="今日调解排期" :subTitle="`共${list.length}条`">
    <div class="table-wrap" slot="container">
      <div class="table-header">
        <div class="code">调解码</div>
        <div class="application">申请人</div>
        <div class="mediate">调解员</div>
        <div class="time">调解时长</div>
        <div class="opt">操作</div>
      </div>
      <div class="table-body">
        <div class="table-item" v-for="(item, index) in list" :key="index">
          <div class="code">{{item.mediateRecordId}}</div>
          <div class="application">{{item.applicantUserRealName}}</div>
          <div class="mediate">{{item.mediatorUserRealName}}</div>
          <div class="time">{{item.mediateTime}}</div>
          <div class="opt">{{item.endReason}}</div>
        </div>
      </div>
    </div>
    
  </Box>
</template>

<script>
import Box from '@/components/Box.vue'
import { getRecordsByArea } from '@/apis/index'
export default {
  name: 'Records',
  data() {
    return {
      list: []
    }
  },
  components: { Box },
  mounted() {
    this.init()
    setInterval(() => this.init(), 30 * 60 * 1000)
  },
  methods: {
    init() {
      getRecordsByArea(this.$route.query.countryName).then((res) => {
        const length = 6 - res.length;
        for(let i = 0; i < length; i++) {
          res.push({})
        }
        this.list = res
      })
    }
  },

}
</script>

<style scoped lang="scss">
@import '../../styles/utils.scss';
.table-wrap {
  margin-top: vh(20);
  text-align: center;

  .table-header {
    font-size: vh(56);
    height: vh(100);
    line-height: vh(100);
    background: rgba(96, 153, 234, 0.15);

    display: flex;
  }

  .table-body {
    font-size: vh(46);
    display: flex;
    flex-direction: column;

    .table-item {
      height: vh(100);
      line-height: vh(100);
      display: flex;

      &:nth-child(2n) {
        background: rgba(96, 153, 234, 0.15);
      }
    }
  }

  .code {
    flex-shrink: 0;
    width: 50px;
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis; 
  }

  .application, 
  .mediate {
    flex-shrink: 0;
    width: 60px;
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis; 
  }

  .time {
    flex-grow: 1;
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis; 
  }

  .opt {
    flex-shrink: 0;
    width: 60px;
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis; 
  }
}
</style>