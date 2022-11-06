<template>
  <Box title="今日来电" :subTitle="`共${phones.length}条`">
    <div class="table-wrap" slot="container">
      <div class="table-header">
        <div class="sort">排序</div>
        <div class="name">姓名</div>
        <div class="area">区域</div>
        <div class="date">来电时间</div>
      </div>
      <div class="table-body">
        <div class="table-item" v-for="(phone, index) in phones" :key="index">
          <div class="sort">{{phone.sort}}</div>
          <div class="name">{{phone.name}}</div>
          <div class="area">{{phone.area}}</div>
          <div class="date">{{phone.date}}</div>
        </div>
      </div>
    </div>
    
  </Box>
</template>

<script>
import Box from '@/components/Box.vue'
export default {
  name: 'Center',
  data() {
    return {
      phones: []
    }
  },
  components: { Box },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const info = {
        sort: 1,
        name: '李四',
        area: '云县镇上的村',
        date: '2020-03-09 12:00:08'
      }

      const infos = []
      for(let i = 0; i < 6; i++) {
        infos.push(info)
      }

      this.phones = infos
    }
  },

}
</script>

<style scoped lang="scss">
@import '../../styles/utils.scss';
.table-wrap {
  margin-top: vh(40);
  text-align: center;

  .table-header {
    font-size: vh(50);
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

  .sort {
    flex-shrink: 0;
    width: 50px;
  }

  .name {
    flex-shrink: 0;
    width: 80px;
  }

  .area {
    flex-grow: 1;
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis; 
  }

  .date {
    flex-shrink: 0;
    width: 140px;
  }
}
</style>