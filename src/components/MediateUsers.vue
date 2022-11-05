<template>
  <div class="mediate-infos">
    <div class="row-header" >
      <div class="sort-col">排名</div>
      <div class="name-col">姓名</div>
      <div class="area-col">区域</div>
      <div class="num-col">数量（件）</div>
    </div>
    <div 
      class="row-body" 
      v-for="(mediateUser, index) in mediateUsers" 
      :key="index"
    >
      <div class="sort-col">{{ index + 1 }}</div>
      <div :class="['name-col', index <= 2 ? 'name-col-highlight' : '' ]">
        <img v-if="index === 0" src="../assets/images/home/first.png" class="user-sort" />
        <img v-if="index === 1" src="../assets/images/home/second.png" class="user-sort" />
        <img v-if="index === 2" src="../assets/images/home/third.png" class="user-sort" />
        {{ mediateUser.mediator_user_real_name }}
      </div>
      <div class="area-col">{{ mediateUser.area }}</div>
      <div class="num-col">{{ mediateUser.num }}</div>
    </div>
  </div>
</template>

<script>
import { getMediateUsers } from '@/apis/index'
export default {
  name: 'MediateUsers',
  data() {
    return {
      mediateUsers: []
    }
  },
  mounted() {
    this.init()
    setInterval(() => this.init(), 30 * 60 * 1000)
  },
  methods: {
    init() {
      getMediateUsers()
      .then((res) => {
        this.mediateUsers = res
      })
      .catch(() => this.mediateUsers =  [])
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/utils.scss';

.mediate-infos {
  width: 100%;
  .row-header {
    width: 100%;
    height: vh(109);
    line-height: vh(109);
    background: rgba(29,84,128,0.49);
    margin-top: vh(57);
    font-size: vh(38);
    font-family: Source Han Sans CN;
    color: #FFFEFE;
    display: flex;
  }

  .row-body {
    height: vh(109);
    line-height: vh(109);
    font-size: vh(33);
    font-family: Adobe Heiti Std;
    font-weight: normal;
    display: flex;

    &:hover {
      background: rgba(29,84,128,0.49);
    }

    .sort-col {
      color: rgba(123, 188, 238, 1);
    }

    .num-col {
      color: rgba(45, 231, 234, 1);
    }

    .name-col {
      color: rgba(46, 223, 228, 1);
      position: relative;

      .user-sort {
        position: absolute;
        top: 0;
        left: vw(32);
        width: vw(49);
        height: vh(49);
      }
    }
    .name-col-highlight {
      color: rgba(255, 198, 8, 1);
    }

    .area-col {
      color: rgba(123, 188, 238, 1);
    }
  }

  

  .sort-col {
    width: vw(236);
  }

  .name-col {
    width: vw(236);
  }

  .area-col {
    flex-grow: 1;
  }

  .num-col {
    width: vw(320);
  }
}
</style>