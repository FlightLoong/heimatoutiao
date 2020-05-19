<template>
  <div class="my-container">
    <div class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <div class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <span>黑马头条号</span>
        </div>
        <div class="right">
          <van-button size="mini" round></van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyIndex'
}
</script>

<style lang="scss" scoped>
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }

      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
}
</style>
