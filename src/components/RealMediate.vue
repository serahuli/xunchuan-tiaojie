<template>
  <div class="real-infos">
    <div class="header">
      <div class="header-item header-left">
        <div class="add-num">{{recordCount}}</div>
        <div class="add-info">今日新增</div>
      </div>
      <div class="header-item header-right">
        <div class="add-num">{{successCount}}</div>
        <div class="add-info">今日调解</div>
      </div>
    </div>

    <div class="content">
      <div class="user-item" v-for="(user, index) in users" :key="index">
        <div class="icon"></div>
        <div class="date">{{user.createTime}}</div>
        <div class="name">{{user.applicantUserRealName}}</div>
        <div class="status">{{user.status}}</div>
        <div class="address">{{user.applicantUserAddress}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNowMediateRecord } from '@/apis/index'
export default {
  name: 'Real',
  data() {
    return {
      users: [],
      recordCount: 0,
      successCount: 0
    }
  },
  mounted() {
    this.init()
    setInterval(() => this.init(), 30 * 60 * 1000)
  },
  methods: {
    init() {
      getNowMediateRecord().then((res) => {
        this.users = res.recordList
        this.recordCount = res.recordCount
        this.successCount = res.successCount

        const index = 6 - res.recordList.length
        for(let i = 0; i < index; i++) {
          this.users.push({})
        }
      })
    }
  },

}
</script>

<style scoped lang="scss">
@import '../styles/utils.scss';

.real-infos {
  .header {
    margin-top: vh(40);
    display: flex;
    justify-content: space-around;

    .header-left {
      background: url('../assets/images/home/phone.png');
    }

    .header-right {
      background: url('../assets/images/home/phone2.png');
    }

    .header-item {
      width: 120px;
      height: vh(240);
      text-align: center;
      color: #fff;
      background-size: cover;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .add-num {
        font-size: vh(80);
        font-weight: 600;
      }
      .add-info {
        font-size: vh(40);
      }
    }
  }

  .content {
    margin-top: vh(40);
    font-size: vh(30);
    color: rgba(196, 196, 196, 1);

    display: flex;
    flex-direction: column;

    .user-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: vh(90);
      line-height: vh(90);
      padding: 0 vw(40);

      &:nth-child(2n) {
        background: rgba(255, 255, 255, 0.2);
      }

      .icon {
        width: 10px;
        height: 10px;
        background: url('../assets/images/home/radius.png');
        background-size: cover;
      }

      .date {
        flex-grow: 1;
      }
      .name {
        width: 60px;
      }
      .status {
        width: 80px;
      }

      .address {
        white-space: nowrap;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis; 
      }
    }
  }
}



</style>