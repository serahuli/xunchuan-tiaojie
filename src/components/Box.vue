<template>
  <div class="box-wrap">
    <div class="box-wrap--title">
      <div class="left">
        <div>{{title}}</div>
        <img class="left-bottom-border" src="../assets/images/home/left-top-border.png" alt="">
      </div>
      <slot name="right">
        <div class="right">
    		  {{ subTitle }}
        </div>
      </slot>
    </div>
    <div class="box-infos">
      <slot name="container"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Box',
  props: {
    title: '',
    subTitle: '',
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
  display: flex;
  flex-direction: column;

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

  .box-infos {
    flex-grow: 1;
  }
}
</style>