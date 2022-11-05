<template>
  <div class="wrap">
    <Header />
    <div class="container">
      <Left />
      <Center class="map-container" />
      <Right />
    </div>
  </div>
</template>

<script>
import Center from './Center.vue'
import Left from './Left.vue'
import Right from './Right.vue'

import Header from '@/components/Header.vue'

export default {
  name: 'Country',
  components: { Center, Left, Right, Header },
}
</script>

<style scoped lang="scss">
@import '../../styles/utils.scss';
.wrap {
  width: 100%;
  height: 100%;
  font-size: 0;
  position: relative;
  background-image: url('../../assets/images/home/bg.png');
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

    }
  }
}
</style>