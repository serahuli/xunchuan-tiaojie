<template>
  <div class="login-wrap">
    <div class="bgs">
      <img class="moon-bg" src="../assets/images/login/bg.png" />
      <img class="app-border" src="../assets/images/login/container-border.png" />
      <img class="map-bg" src="../assets/images/login/map.png" />
    </div>

    <div class="header">
      <img src="../assets/images/login/logo.png" class="header-logo">
      <div class="header-title">
        无讼临沧·溯源治理
      </div>
    </div>

    <div class="login">
      <div class="login-title">用户登录</div>
      <el-input
        class="user-input"
        placeholder="用户名"
        v-model="username">
        <img slot="prefix" class="input-icon" src="../assets/images/login/user.png" />
      </el-input>
      <el-input
        class="password-input"
        placeholder="密码"
        show-password
        type="password"
        v-model="password">
        <img slot="prefix" class="input-icon" src="../assets/images/login/password.png" />
      </el-input>
      <el-button class="login-btn">登 录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  options: {
    styleIsolation: 'shared'
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

  .bgs {
    width: 100%; 
    height: 100%;

    .moon-bg,
    .app-border,
    .map-bg {
      position: absolute;
    }

    .moon-bg {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    .app-border {
      width: vw(5601);
      height: vh(3098);
      top: vh(71);
      left: vw(83);
      z-index: 1;
    }

    .map-bg {
      width: vw(2127);
      height: vh(2415);
      top: vh(484);
      left: vw(480);
      z-index: 2;
    }
  }

  .header {
    position: absolute;
    top: vh(80);
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;

    display: flex;
    align-items: center;

    .header-logo {
      width: vw(170);
      height: vh(194);
    }

    .header-title {
      font-size: vh(175);
      font-family: 'YouSheBiaoTiHei';
      font-weight: 400;
      color: #FFFFFF;
      margin-left: vw(30);
    }
  }

  .login {
    position: absolute;
    z-index: 4;
    top: vh(866);
    right: vw(489);

    width: vw(2041);
    height: vh(1645);
    padding: 0 vw(335);
    box-sizing: border-box;

    background: url('../assets/images/login/login-border.png');
    background-size: vw(2041) vh(1645);

    &-title {
      margin-top: vh(204);
      font-size: vh(123);
      font-family: PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      text-align: center;
    }

    

    .user-input {
      margin-top: vh(165);
    }
    .password-input {
      margin-top: vh(107);
    }

    /deep/ .el-input__inner {
      width: vw(1309);
      height: vh(182);
      border: vw(1) solid rgba(0, 210, 255, 0.6);
      border-radius: vh(19);
      background: transparent;
      color: #fff;
      padding-left: vw(208);

      &::placeholder {
        color: #fff;
        font-size: vh(65);
      }
    }

    /deep/ .el-input__prefix {
      display: flex;
      align-items: center;
      margin-left: vw(68);
      .input-icon {
        width: vw(68);
        height: vh(76);
      }
    }

    

    &-btn {
      width: 100%;
      margin-top: vh(138);
      color: #FFFFFF;
      background: linear-gradient(0deg, #0177E4, #00B8FF);
      border: none;
      cursor: pointer;
      font-size: vh(88);
    }
  }
}
</style>